#!/bin/bash

# 🚀 Script para iniciar todos os serviços localmente
# Execute este script para iniciar o ambiente de desenvolvimento

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Salvar o diretório original
ORIGINAL_DIR=$(pwd)

# Função para matar processos usando portas específicas
kill_process_on_port() {
  local port=$1
  local pid=$(lsof -t -i:$port)
  if [ -n "$pid" ]; then
    echo -e "${YELLOW}⚠️ Processo encontrado na porta $port (PID: $pid). Encerrando...${NC}"
    kill -9 $pid 2>/dev/null || true
    sleep 1
  fi
}

# Limpar portas que serão usadas
echo -e "${YELLOW}🧹 Limpando portas em uso...${NC}"
kill_process_on_port 3000  # Frontend Auth
kill_process_on_port 3001  # Backend
kill_process_on_port 3003  # Frontend Dashboard

echo -e "${GREEN}🚀 Iniciando ambiente de desenvolvimento...${NC}"
echo "=========================================="

# Verificar e instalar dependências do projeto raiz
echo -e "${YELLOW}🔍 Verificando dependências do projeto raiz...${NC}"
cd "$(dirname "$0")"
cd ".." || { echo -e "${RED}❌ Diretório raiz não encontrado!${NC}"; exit 1; }
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Instalando dependências do projeto raiz...${NC}"
  npm install
fi

# Verificar e instalar dependências do pacote compartilhado
echo -e "${YELLOW}🔍 Verificando dependências do pacote compartilhado...${NC}"
cd "packages" || { echo -e "${RED}❌ Diretório de pacotes compartilhados não encontrado!${NC}"; exit 1; }
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Instalando dependências do pacote compartilhado...${NC}"
  npm install
fi
cd "$ORIGINAL_DIR"


# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando!${NC}"
    echo -e "${YELLOW}💡 Inicie o Docker e tente novamente${NC}"
    exit 1
fi

# Iniciar o banco de dados PostgreSQL
echo -e "${YELLOW}🐘 Iniciando PostgreSQL...${NC}"
cd "$(dirname "$0")"
cd "../infra/docker" || { echo -e "${RED}❌ Diretório de infraestrutura não encontrado!${NC}"; exit 1; }
docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d db
cd "$ORIGINAL_DIR"

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
cd "$(dirname "$0")"
cd "../apps/backend" || { echo -e "${RED}❌ Diretório do backend não encontrado!${NC}"; exit 1; }

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Instalando dependências do backend...${NC}"
  npm install
fi

# Verificar se nodemon está instalado
if ! npm list -g nodemon > /dev/null 2>&1; then
  echo -e "${YELLOW}⏳ Instalando nodemon globalmente...${NC}"
  npm install -g nodemon
fi

npm run dev &
BACKEND_PID=$!
cd "$ORIGINAL_DIR"

# Aguardar o backend iniciar
echo -e "${YELLOW}⏳ Aguardando backend iniciar...${NC}"
sleep 5

# Iniciar o frontend de autenticação
echo -e "${YELLOW}🚀 Iniciando frontend de autenticação...${NC}"
cd "$(dirname "$0")"
cd "../apps/frontend/auth" || { echo -e "${RED}❌ Diretório de autenticação não encontrado!${NC}"; exit 1; }

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Instalando dependências do frontend de autenticação...${NC}"
  npm install
fi

# Usar a porta 3000 para o módulo de autenticação
PORT=3000 npm start &
AUTH_PID=$!
cd "$ORIGINAL_DIR"

# Iniciar o frontend de dashboard
echo -e "${YELLOW}🚀 Iniciando frontend de dashboard...${NC}"
cd "$(dirname "$0")"
cd "../apps/frontend/dashboard" || { echo -e "${RED}❌ Diretório de dashboard não encontrado!${NC}"; exit 1; }

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Instalando dependências do frontend de dashboard...${NC}"
  npm install
fi

# Usar a porta 3003 para o módulo de dashboard
PORT=3003 npm start &
DASHBOARD_PID=$!
cd "$ORIGINAL_DIR"

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