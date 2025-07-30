#!/bin/bash

# 🧹 Script para limpar o ambiente de desenvolvimento
# Execute este script para parar todos os serviços e limpar recursos não utilizados

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧹 Iniciando limpeza do ambiente...${NC}"
echo "=========================================="

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando!${NC}"
    echo -e "${YELLOW}💡 Inicie o Docker e tente novamente${NC}"
    exit 1
fi

# Parar todos os containers do projeto
echo -e "${YELLOW}🛑 Parando containers Docker...${NC}"
docker stop finance_db finance_meta finance_backend finance_frontend_web finance_frontend_mobile 2>/dev/null || true

# Matar processos Node.js relacionados ao projeto
echo -e "${YELLOW}🛑 Parando processos Node.js...${NC}"
PROJECT_DIR="$(dirname "$0")/.." 
PROCESSES=$(ps aux | grep "node" | grep "$PROJECT_DIR" | awk '{print $2}')

if [ -n "$PROCESSES" ]; then
    echo -e "${YELLOW}Processos encontrados: $PROCESSES${NC}"
    for PID in $PROCESSES; do
        echo -e "${YELLOW}Matando processo $PID...${NC}"
        kill -9 $PID 2>/dev/null || true
    done
else
    echo -e "${GREEN}✅ Nenhum processo Node.js encontrado${NC}"
fi

# Limpar arquivos temporários
echo -e "${YELLOW}🧹 Limpando arquivos temporários...${NC}"

# Limpar node_modules (opcional)
read -p "Deseja remover os node_modules? (s/N): " CLEAN_MODULES
if [ "$CLEAN_MODULES" = "s" ] || [ "$CLEAN_MODULES" = "S" ]; then
    echo -e "${YELLOW}🧹 Removendo node_modules...${NC}"
    find "$PROJECT_DIR" -name "node_modules" -type d -exec rm -rf {} +
fi

# Limpar arquivos de build
echo -e "${YELLOW}🧹 Removendo arquivos de build...${NC}"
find "$PROJECT_DIR" -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
find "$PROJECT_DIR" -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true

# Limpar cache do npm
read -p "Deseja limpar o cache do npm? (s/N): " CLEAN_CACHE
if [ "$CLEAN_CACHE" = "s" ] || [ "$CLEAN_CACHE" = "S" ]; then
    echo -e "${YELLOW}🧹 Limpando cache do npm...${NC}"
    npm cache clean --force
fi

# Limpar imagens Docker não utilizadas
read -p "Deseja remover imagens Docker não utilizadas? (s/N): " CLEAN_IMAGES
if [ "$CLEAN_IMAGES" = "s" ] || [ "$CLEAN_IMAGES" = "S" ]; then
    echo -e "${YELLOW}🧹 Removendo imagens Docker não utilizadas...${NC}"
    docker image prune -af
fi

echo "=========================================="
echo -e "${GREEN}✅ Limpeza concluída com sucesso!${NC}"
echo -e "${YELLOW}💡 Para iniciar o ambiente novamente, execute: ./scripts/start-local.sh${NC}"