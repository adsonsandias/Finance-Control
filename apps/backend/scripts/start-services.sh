#!/bin/bash

# Script para iniciar todos os serviços do Finance Control
# Incluindo o banco de dados PostgreSQL

echo "🚀 Iniciando todos os serviços do Finance Control..."
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

# Verificar se os arquivos docker-compose existem
if [ ! -f "../docker-compose.yml" ] || [ ! -f "../docker-compose.db.yml" ]; then
    echo -e "${YELLOW}⚠️  Arquivos docker-compose não encontrados! Verifique se você está executando este script do diretório correto.${NC}"
    exit 1
fi

# Navegar para o diretório raiz do projeto
cd ..

# Iniciar todos os serviços
echo "🐳 Iniciando serviços com Docker Compose..."
docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d

# Verificar se os serviços foram iniciados corretamente
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Todos os serviços foram iniciados com sucesso!${NC}"
    echo -e "\n📊 Serviços disponíveis:"
    echo -e "- Frontend Auth: ${GREEN}http://localhost:3000${NC}"
    echo -e "- Frontend Dashboard: ${GREEN}http://localhost:3001${NC}"
    echo -e "- Backend API: ${GREEN}http://localhost:3002${NC}"
    echo -e "- Supabase: ${GREEN}http://localhost:54323${NC}"
    
    echo -e "\n🔍 Para verificar o status dos serviços, execute:"
    echo -e "  ${YELLOW}docker-compose ps${NC}"
    
    echo -e "\n📝 Para ver os logs, execute:"
    echo -e "  ${YELLOW}docker-compose logs -f [nome-do-serviço]${NC}"
    
    echo -e "\n🛑 Para parar todos os serviços, execute:"
    echo -e "  ${YELLOW}docker-compose down${NC}"
    
    echo -e "\n🔄 Para reiniciar um serviço específico, execute:"
    echo -e "  ${YELLOW}docker-compose restart [nome-do-serviço]${NC}"
    
    echo -e "\n🐘 Para acessar o banco de dados PostgreSQL, execute:"
    echo -e "  ${YELLOW}docker-compose exec db psql -U postgres -d finance_control${NC}"
    
    echo -e "\n🔐 Para aplicar o schema do Supabase, execute:"
    echo -e "  ${YELLOW}./backend/scripts/update-supabase-schema.sh${NC}"
    
    echo -e "\n=========================================="
    echo -e "${GREEN}✅ Finance Control está pronto para uso!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Ocorreu um erro ao iniciar os serviços. Verifique os logs para mais detalhes.${NC}"
    echo -e "  ${YELLOW}docker-compose logs${NC}"
    exit 1
fi