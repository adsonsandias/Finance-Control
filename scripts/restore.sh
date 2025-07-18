#!/bin/bash

# 🔄 Script de Restore para Produção
# Use este script para restaurar backups do banco de dados

set -e  # Exit on any error

# Configurações
BACKUP_DIR="./backups"
CONTAINER_NAME="finance_db"
DB_USER="${POSTGRES_USER:-finance_user}"
DB_NAME="${POSTGRES_DB:-finance_control_prod}"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para mostrar uso
show_usage() {
    echo -e "${BLUE}📖 Uso: $0 <arquivo_backup>${NC}"
    echo -e "${BLUE}Exemplo: $0 finance_backup_20231201_120000.sql.gz${NC}"
    echo ""
    echo -e "${YELLOW}📋 Backups disponíveis:${NC}"
    ls -1 "$BACKUP_DIR"/finance_backup_*.sql.gz 2>/dev/null || echo "Nenhum backup encontrado"
    exit 1
}

# Verificar parâmetros
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ Erro: Arquivo de backup não especificado${NC}"
    show_usage
fi

BACKUP_FILE="$1"

# Verificar se o arquivo existe
if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Erro: Arquivo de backup não encontrado: $BACKUP_DIR/$BACKUP_FILE${NC}"
    show_usage
fi

echo -e "${GREEN}🔄 Iniciando restore do banco de dados...${NC}"
echo "==========================================="
echo -e "${BLUE}📁 Arquivo: $BACKUP_DIR/$BACKUP_FILE${NC}"
echo -e "${BLUE}🗄️  Database: $DB_NAME${NC}"
echo -e "${BLUE}👤 User: $DB_USER${NC}"
echo ""

# Verificar se o container está rodando
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo -e "${RED}❌ Container $CONTAINER_NAME não está rodando!${NC}"
    echo -e "${YELLOW}💡 Execute: docker-compose up -d${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Container encontrado: $CONTAINER_NAME${NC}"

# Confirmação de segurança
echo -e "${YELLOW}⚠️  ATENÇÃO: Esta operação irá SUBSTITUIR todos os dados atuais!${NC}"
echo -e "${YELLOW}⚠️  Database: $DB_NAME${NC}"
echo ""
read -p "Tem certeza que deseja continuar? (digite 'CONFIRMO' para prosseguir): " confirmation

if [ "$confirmation" != "CONFIRMO" ]; then
    echo -e "${YELLOW}🚫 Operação cancelada pelo usuário${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}🚀 Iniciando processo de restore...${NC}"

# Fazer backup dos dados atuais antes do restore
echo -e "${YELLOW}💾 Fazendo backup de segurança dos dados atuais...${NC}"
SAFETY_BACKUP="safety_backup_$(date +"%Y%m%d_%H%M%S").sql"
if docker-compose exec -T db pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_DIR/$SAFETY_BACKUP"; then
    echo -e "${GREEN}✅ Backup de segurança criado: $SAFETY_BACKUP${NC}"
else
    echo -e "${RED}❌ Erro ao criar backup de segurança!${NC}"
    exit 1
fi

# Descomprimir se necessário
RESTORE_FILE="$BACKUP_DIR/$BACKUP_FILE"
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo -e "${YELLOW}🗜️  Descomprimindo arquivo...${NC}"
    TEMP_FILE="/tmp/$(basename "$BACKUP_FILE" .gz)"
    gunzip -c "$RESTORE_FILE" > "$TEMP_FILE"
    RESTORE_FILE="$TEMP_FILE"
fi

# Verificar integridade do arquivo SQL
echo -e "${YELLOW}🔍 Verificando integridade do arquivo...${NC}"
if ! head -n 5 "$RESTORE_FILE" | grep -q "PostgreSQL database dump"; then
    echo -e "${RED}❌ Arquivo não parece ser um dump válido do PostgreSQL!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Arquivo válido${NC}"

# Parar aplicações que usam o banco
echo -e "${YELLOW}⏸️  Parando aplicações...${NC}"
docker-compose stop backend frontend-auth frontend-dashboard 2>/dev/null || true

# Desconectar usuários ativos
echo -e "${YELLOW}🔌 Desconectando usuários ativos...${NC}"
docker-compose exec db psql -U "$DB_USER" -d postgres -c "
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();
" 2>/dev/null || true

# Dropar e recriar database
echo -e "${YELLOW}🗑️  Recriando database...${NC}"
docker-compose exec db psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker-compose exec db psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"

# Restaurar dados
echo -e "${YELLOW}📥 Restaurando dados...${NC}"
if docker-compose exec -T db psql -U "$DB_USER" -d "$DB_NAME" < "$RESTORE_FILE"; then
    echo -e "${GREEN}✅ Dados restaurados com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro durante o restore!${NC}"
    echo -e "${YELLOW}🔄 Tentando restaurar backup de segurança...${NC}"
    
    # Tentar restaurar backup de segurança
    docker-compose exec db psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
    docker-compose exec db psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"
    docker-compose exec -T db psql -U "$DB_USER" -d "$DB_NAME" < "$BACKUP_DIR/$SAFETY_BACKUP"
    
    echo -e "${YELLOW}✅ Backup de segurança restaurado${NC}"
    exit 1
fi

# Limpar arquivo temporário
if [[ "$BACKUP_FILE" == *.gz ]] && [ -f "$TEMP_FILE" ]; then
    rm "$TEMP_FILE"
fi

# Reiniciar aplicações
echo -e "${YELLOW}🚀 Reiniciando aplicações...${NC}"
docker-compose up -d

# Aguardar aplicações ficarem prontas
echo -e "${YELLOW}⏳ Aguardando aplicações ficarem prontas...${NC}"
sleep 10

# Verificar se tudo está funcionando
echo -e "${YELLOW}🔍 Verificando status das aplicações...${NC}"
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Aplicações rodando${NC}"
else
    echo -e "${RED}❌ Algumas aplicações podem não estar funcionando${NC}"
    docker-compose ps
fi

# Verificar conectividade do banco
echo -e "${YELLOW}🔍 Verificando conectividade do banco...${NC}"
if docker-compose exec db pg_isready -U "$DB_USER" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Banco de dados acessível${NC}"
else
    echo -e "${RED}❌ Problema de conectividade com o banco${NC}"
fi

echo "==========================================="
echo -e "${GREEN}🎉 Restore concluído!${NC}"
echo -e "${BLUE}📊 Estatísticas:${NC}"
echo -e "${BLUE}   • Arquivo restaurado: $BACKUP_FILE${NC}"
echo -e "${BLUE}   • Backup de segurança: $SAFETY_BACKUP${NC}"
echo -e "${BLUE}   • Database: $DB_NAME${NC}"
echo ""
echo -e "${YELLOW}💡 Verifique se a aplicação está funcionando corretamente${NC}"
echo -e "${YELLOW}💡 Em caso de problemas, o backup de segurança está disponível${NC}"