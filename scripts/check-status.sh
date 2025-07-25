#!/bin/bash

# 🔍 Script para verificar o status de todos os serviços
# Execute este script para verificar se todos os serviços estão rodando corretamente

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔍 Verificando status dos serviços...${NC}"
echo "=========================================="

# Verificar se o Docker está rodando
echo -e "${YELLOW}🐳 Verificando Docker...${NC}"
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Docker está rodando${NC}"
else
    echo -e "${RED}❌ Docker não está rodando${NC}"
fi

# Verificar se o banco de dados está rodando
echo -e "${YELLOW}🐘 Verificando PostgreSQL...${NC}"
if docker ps | grep -q "finance_db"; then
    echo -e "${GREEN}✅ PostgreSQL está rodando${NC}"
else
    echo -e "${RED}❌ PostgreSQL não está rodando${NC}"
    echo -e "${YELLOW}💡 Execute: cd infra/docker && docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d db${NC}"
fi

# Verificar se o backend está rodando
echo -e "${YELLOW}🚀 Verificando backend...${NC}"
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend está rodando${NC}"
else
    echo -e "${RED}❌ Backend não está rodando${NC}"
    echo -e "${YELLOW}💡 Execute: cd apps/backend && npm run dev${NC}"
fi

# Verificar se o frontend de autenticação está rodando
echo -e "${YELLOW}🚀 Verificando frontend de autenticação...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Frontend de autenticação está rodando${NC}"
else
    echo -e "${RED}❌ Frontend de autenticação não está rodando${NC}"
    echo -e "${YELLOW}💡 Execute: cd apps/frontend/auth && npm start${NC}"
fi

# Verificar se o frontend de dashboard está rodando
echo -e "${YELLOW}🚀 Verificando frontend de dashboard...${NC}"
if curl -s http://localhost:3003 > /dev/null; then
    echo -e "${GREEN}✅ Frontend de dashboard está rodando${NC}"
else
    echo -e "${RED}❌ Frontend de dashboard não está rodando${NC}"
    echo -e "${YELLOW}💡 Execute: cd apps/frontend/dashboard && npm start${NC}"
fi

echo "=========================================="
echo -e "${GREEN}✅ Verificação concluída!${NC}"
echo -e "${YELLOW}💡 Para iniciar todos os serviços, execute: ./scripts/start-local.sh${NC}"