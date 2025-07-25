#!/bin/bash

# 💾 Script de Backup para Produção
# Execute este script regularmente para fazer backup dos dados

set -e  # Exit on any error

# Configurações
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="finance_backup_${DATE}.sql"
CONTAINER_NAME="finance_db"
DB_USER="postgres"
DB_NAME="finance_control"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando backup do banco de dados...${NC}"
echo "==========================================="

# Criar diretório de backup se não existir
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${YELLOW}📁 Criando diretório de backup: $BACKUP_DIR${NC}"
    mkdir -p "$BACKUP_DIR"
fi

# Verificar se o container está rodando
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo -e "${RED}❌ Container $CONTAINER_NAME não está rodando!${NC}"
    echo -e "${YELLOW}💡 Execute: cd infra/docker && docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d db${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Container encontrado: $CONTAINER_NAME${NC}"

# Fazer backup
echo -e "${YELLOW}💾 Fazendo backup da base de dados...${NC}"
echo "Arquivo: $BACKUP_DIR/$BACKUP_FILE"
echo "Database: $DB_NAME"
echo "User: $DB_USER"

if docker exec -i $CONTAINER_NAME pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_DIR/$BACKUP_FILE"; then
    echo -e "${GREEN}✅ Backup criado com sucesso!${NC}"
    
    # Verificar tamanho do arquivo
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}📊 Tamanho do backup: $BACKUP_SIZE${NC}"
    
    # Comprimir backup
    echo -e "${YELLOW}🗜️  Comprimindo backup...${NC}"
    gzip "$BACKUP_DIR/$BACKUP_FILE"
    COMPRESSED_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE.gz" | cut -f1)
    echo -e "${GREEN}✅ Backup comprimido: $COMPRESSED_SIZE${NC}"
    
else
    echo -e "${RED}❌ Erro ao criar backup!${NC}"
    exit 1
fi

# Limpar backups antigos (manter apenas os últimos 7 dias)
echo -e "${YELLOW}🧹 Limpando backups antigos...${NC}"
find "$BACKUP_DIR" -name "finance_backup_*.sql.gz" -mtime +7 -delete
REMAINING=$(find "$BACKUP_DIR" -name "finance_backup_*.sql.gz" | wc -l)
echo -e "${GREEN}✅ Backups restantes: $REMAINING${NC}"

# Listar backups disponíveis
echo -e "${GREEN}📋 Backups disponíveis:${NC}"
ls -lh "$BACKUP_DIR"/finance_backup_*.sql.gz 2>/dev/null || echo "Nenhum backup encontrado"

echo "==========================================="
echo -e "${GREEN}🎉 Backup concluído com sucesso!${NC}"
echo -e "${YELLOW}💡 Para restaurar: ./scripts/restore.sh $BACKUP_FILE.gz${NC}"

# Opcional: Enviar backup para storage remoto
if [ "$REMOTE_BACKUP" = "true" ]; then
    echo -e "${YELLOW}☁️  Enviando backup para storage remoto...${NC}"
    # Adicione aqui comandos para enviar para S3, Google Cloud, etc.
    # aws s3 cp "$BACKUP_DIR/$BACKUP_FILE.gz" s3://seu-bucket/backups/
fi