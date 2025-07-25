#!/bin/bash

# 🚀 Script para iniciar todos os serviços localmente
# Execute este script para iniciar o ambiente de desenvolvimento

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando ambiente de desenvolvimento...${NC}"
echo "=========================================="

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando!${NC}"
    echo -e "${YELLOW}💡 Inicie o Docker e tente novamente${NC}"
    exit 1
fi

# Iniciar o banco de dados PostgreSQL
echo -e "${YELLOW}🐘 Iniciando PostgreSQL...${NC}"
cd "$(dirname "$0")/../infra/docker" && docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d db

# Verificar se o banco de dados está rodando
echo -e "${YELLOW}⏳ Aguardando PostgreSQL iniciar...${NC}"
sleep 5
if ! docker ps | grep -q "finance_db"; then
    echo -e "${RED}❌ Falha ao iniciar o PostgreSQL!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL iniciado com sucesso!${NC}"

# Iniciar o backend
echo -e "${YELLOW}🚀 Iniciando backend...${NC}"
cd "$(dirname "$0")/../apps/backend" && npm run dev &
BACKEND_PID=$!

# Aguardar o backend iniciar
echo -e "${YELLOW}⏳ Aguardando backend iniciar...${NC}"
sleep 5

# Iniciar o frontend de autenticação
echo -e "${YELLOW}🚀 Iniciando frontend de autenticação...${NC}"
cd "$(dirname "$0")/../apps/frontend/auth" && npm start &
AUTH_PID=$!

# Iniciar o frontend de dashboard
echo -e "${YELLOW}🚀 Iniciando frontend de dashboard...${NC}"
cd "$(dirname "$0")/../apps/frontend/dashboard" && npm start &
DASHBOARD_PID=$!

echo "=========================================="
echo -e "${GREEN}✅ Todos os serviços foram iniciados!${NC}"
echo -e "${BLUE}📊 Serviços disponíveis:${NC}"
echo -e "${BLUE}   • Backend: http://localhost:3001${NC}"
echo -e "${BLUE}   • Frontend Auth: http://localhost:3000${NC}"
echo -e "${BLUE}   • Frontend Dashboard: http://localhost:3003${NC}"
echo -e "${BLUE}   • PostgreSQL: localhost:5432${NC}"
echo ""
echo -e "${YELLOW}💡 Pressione Ctrl+C para parar todos os serviços${NC}"

# Função para limpar ao sair
cleanup() {
    echo -e "\n${YELLOW}🛑 Parando todos os serviços...${NC}"
    
    # Matar processos
    kill $BACKEND_PID 2>/dev/null
    kill $AUTH_PID 2>/dev/null
    kill $DASHBOARD_PID 2>/dev/null
    
    # Parar containers Docker
    docker stop finance_db finance_meta 2>/dev/null || true
    
    echo -e "${GREEN}✅ Todos os serviços foram parados!${NC}"
    exit 0
}

# Registrar função de limpeza
trap cleanup SIGINT SIGTERM

# Manter o script rodando
wait