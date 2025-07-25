#!/bin/bash

# Script para parar todos os serviços do Finance Control

echo "🛑 Parando todos os serviços do Finance Control..."
echo "=========================================="

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker não encontrado! Por favor, instale o Docker antes de continuar.${NC}"
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose não encontrado! Por favor, instale o Docker Compose antes de continuar.${NC}"
    exit 1
fi

# Navegar para o diretório raiz do projeto
cd ..

# Parar todos os serviços
echo "🐳 Parando serviços com Docker Compose..."
docker-compose down

# Verificar se os serviços foram parados corretamente
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Todos os serviços foram parados com sucesso!${NC}"
    
    echo -e "\n🔍 Para verificar o status dos serviços, execute:"
    echo -e "  ${YELLOW}docker-compose ps${NC}"
    
    echo -e "\n🚀 Para iniciar todos os serviços novamente, execute:"
    echo -e "  ${YELLOW}./backend/scripts/start-services.sh${NC}"
    
    echo -e "\n=========================================="
    echo -e "${GREEN}✅ Finance Control foi parado com sucesso!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Ocorreu um erro ao parar os serviços. Verifique os logs para mais detalhes.${NC}"
    echo -e "  ${YELLOW}docker-compose logs${NC}"
    exit 1
fi