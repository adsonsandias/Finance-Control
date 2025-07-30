#!/bin/bash

# 🚀 Finance Control Project Setup Script
# This script helps new users set up the project from scratch

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Get the project root directory (parent of scripts directory)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "\n${GREEN}=== Finance Control Project Setup ===${NC}"
echo -e "${YELLOW}This script will help you set up the Finance Control project from scratch.${NC}\n"

# Check system requirements
echo -e "${BLUE}=== Checking System Requirements ===${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo -e "${YELLOW}💡 Please install Node.js (v18 or higher):${NC}"
    echo -e "${BLUE}   - Visit: https://nodejs.org/en/download/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)
if [ $NODE_MAJOR_VERSION -lt 18 ]; then
    echo -e "${RED}❌ Node.js version is too old: v$NODE_VERSION${NC}"
    echo -e "${YELLOW}💡 Please upgrade to Node.js v18 or higher:${NC}"
    echo -e "${BLUE}   - Visit: https://nodejs.org/en/download/${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js v$NODE_VERSION is installed.${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    echo -e "${YELLOW}💡 npm should be installed with Node.js. Please reinstall Node.js:${NC}"
    echo -e "${BLUE}   - Visit: https://nodejs.org/en/download/${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm v$NPM_VERSION is installed.${NC}"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo -e "${YELLOW}💡 Please install Docker:${NC}"
    echo -e "${BLUE}   - Visit: https://docs.docker.com/get-docker/${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker is installed.${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running!${NC}"
    echo -e "${YELLOW}💡 Please start Docker and run this script again.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker is running.${NC}"

# Check PostgreSQL client
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL client (psql) is not installed!${NC}"
    echo -e "${YELLOW}💡 Please install PostgreSQL client:${NC}"
    echo -e "${BLUE}   - macOS: brew install postgresql${NC}"
    echo -e "${BLUE}   - Ubuntu/Debian: sudo apt-get install postgresql-client${NC}"
    echo -e "${BLUE}   - Windows: Install from https://www.postgresql.org/download/windows/${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL client is installed.${NC}"

# Check Supabase CLI
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⏳ Supabase CLI is not installed. Installing now...${NC}"
    
    # Check operating system
    if [[ "$(uname)" == "Darwin" ]]; then
        # macOS - use Homebrew
        if command -v brew &> /dev/null; then
            echo -e "${YELLOW}Installing via Homebrew...${NC}"
            brew install supabase/tap/supabase
        else
            echo -e "${RED}❌ Homebrew not found. Install Homebrew first:${NC}"
            echo -e "${BLUE}/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"${NC}"
            exit 1
        fi
    elif [[ "$(uname)" == "Linux" ]]; then
        # Linux - use curl
        echo -e "${YELLOW}Installing via curl...${NC}"
        curl -s https://raw.githubusercontent.com/supabase/cli/main/install.sh | bash
    else
        # Windows or other - manual instructions
        echo -e "${RED}❌ Operating system not supported for automatic installation.${NC}"
        echo -e "${YELLOW}💡 Install Supabase CLI manually following the instructions at:${NC}"
        echo -e "${BLUE}https://github.com/supabase/cli#install-the-cli${NC}"
        exit 1
    fi
    
    # Check if installation was successful
    if command -v supabase &> /dev/null; then
        echo -e "${GREEN}✅ Supabase CLI installed successfully!${NC}"
    else
        echo -e "${RED}❌ Failed to install Supabase CLI.${NC}"
        echo -e "${YELLOW}💡 Install manually following the instructions at:${NC}"
        echo -e "${BLUE}https://github.com/supabase/cli#install-the-cli${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Supabase CLI is installed.${NC}"
fi

echo -e "\n${GREEN}=== All system requirements met! ===${NC}\n"

# Install project dependencies
echo -e "${BLUE}=== Installing Project Dependencies ===${NC}"

# Install root project dependencies
echo -e "${YELLOW}⏳ Installing root project dependencies...${NC}"
cd "$PROJECT_ROOT"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing root dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Root project dependencies installed.${NC}"

# Install shared package dependencies
echo -e "${YELLOW}⏳ Installing shared package dependencies...${NC}"
cd "$PROJECT_ROOT/packages"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing shared package dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Shared package dependencies installed.${NC}"

# Install backend dependencies
echo -e "${YELLOW}⏳ Installing backend dependencies...${NC}"
cd "$PROJECT_ROOT/apps/backend"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing backend dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Backend dependencies installed.${NC}"

# Install frontend web dependencies
echo -e "${YELLOW}⏳ Installing frontend web dependencies...${NC}"
cd "$PROJECT_ROOT/apps/frontend/web"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing frontend web dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Frontend web dependencies installed.${NC}"

# Install frontend mobile dependencies
echo -e "${YELLOW}⏳ Installing frontend mobile dependencies...${NC}"
cd "$PROJECT_ROOT/apps/frontend/mobile"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing frontend mobile dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Frontend mobile dependencies installed.${NC}"

# Setup environment files
echo -e "\n${BLUE}=== Setting Up Environment Files ===${NC}"

# Setup root .env file
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo -e "${YELLOW}⏳ Creating root .env file...${NC}"
    cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
    echo -e "${GREEN}✅ Root .env file created.${NC}"
else
    echo -e "${GREEN}✅ Root .env file already exists.${NC}"
fi

# Setup backend .env file
if [ ! -f "$PROJECT_ROOT/apps/backend/.env" ]; then
    echo -e "${YELLOW}⏳ Creating backend .env file...${NC}"
    cp "$PROJECT_ROOT/apps/backend/.env.example" "$PROJECT_ROOT/apps/backend/.env"
    echo -e "${GREEN}✅ Backend .env file created.${NC}"
else
    echo -e "${GREEN}✅ Backend .env file already exists.${NC}"
fi

# Setup Supabase
echo -e "\n${BLUE}=== Setting Up Supabase ===${NC}"
echo -e "${YELLOW}⏳ Setting up Supabase...${NC}"

# Executar script adicional de setup do Supabase (se necessário)
chmod +x "$PROJECT_ROOT/scripts/setup-supabase.sh"
"$PROJECT_ROOT/scripts/setup-supabase.sh"

# Verificar se o Supabase está rodando
if ! supabase status &> /dev/null; then
    echo -e "${RED}❌ Supabase não está rodando. Tentando iniciar...${NC}"
    supabase stop &> /dev/null || true
    sleep 2

    # Tentar iniciar com configuração personalizada
    if ! supabase start; then
        echo -e "${YELLOW}⚠️ Tentando iniciar Supabase com configuração personalizada...${NC}"
        if [ ! -f "$PROJECT_ROOT/supabase/config.toml" ]; then
            mkdir -p "$PROJECT_ROOT/supabase"
            cat > "$PROJECT_ROOT/supabase/config.toml" << EOF
[api]
port = 54321
[db]
port = 54323
[studio]
port = 54334
EOF
        fi
        supabase start || {
            echo -e "${RED}❌ Falha ao iniciar o Supabase. Execute manualmente: supabase start${NC}"
            exit 1
        }
    fi
fi

# Aplicar o schema SQL
echo -e "${YELLOW}⏳ Aplicando schema SQL...${NC}"
SCHEMA_FILE="$PROJECT_ROOT/apps/backend/supabase/migrations/supabase-schema.sql"
SAMPLE_DATA_FILE="$PROJECT_ROOT/apps/backend/supabase/migrations/sample-data.sql"

if [ ! -f "$SCHEMA_FILE" ]; then
    echo -e "${RED}❌ Arquivo de schema não encontrado: $SCHEMA_FILE${NC}"
    exit 1
fi

# Executar o schema com saída detalhada para verificar erros
echo -e "${YELLOW}⏳ Executando schema SQL com saída detalhada...${NC}"
PGPASSWORD="postgres" psql -h "localhost" -p "54322" -d "postgres" -U "postgres" -v ON_ERROR_STOP=1 -f "$SCHEMA_FILE"
SCHEMA_STATUS=$?

if [ $SCHEMA_STATUS -ne 0 ]; then
    echo -e "${RED}❌ Erro ao aplicar o schema SQL. Verifique os erros acima.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Schema aplicado com sucesso.${NC}"

# Verificar se a tabela transactions foi criada
echo -e "${YELLOW}⏳ Verificando se a tabela transactions foi criada...${NC}"
TABLE_CHECK=$(PGPASSWORD="postgres" psql -h "localhost" -p "54322" -d "postgres" -U "postgres" -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions');")

if [[ $TABLE_CHECK != *t* ]]; then
    echo -e "${RED}❌ A tabela transactions não foi criada. Verifique o schema SQL.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Tabela transactions verificada com sucesso.${NC}"

echo -e "${BLUE}=== Criando usuário real via Supabase Admin API ===${NC}"

USER_EMAIL="usuario@exemplo.com"
USER_PASSWORD="123456"
DISPLAY_NAME="Usuário Teste"

# Obter a URL e a chave do Supabase local
SUPABASE_URL="http://127.0.0.1:54321"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"

# Criar usuário usando a API REST do Supabase
CREATE_USER_RESPONSE=$(curl -s -X POST "${SUPABASE_URL}/auth/v1/admin/users" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "email": "'"$USER_EMAIL"'",
        "password": "'"$USER_PASSWORD"'",
        "email_confirm": true,
        "user_metadata": {
          "display_name": "'"$DISPLAY_NAME"'"
        }
      }')

USER_ID=$(echo "$CREATE_USER_RESPONSE" | grep -o '"id":"[^"]*' | head -n 1 | cut -d '"' -f4)
# Após extrair o USER_ID
echo "ID do usuário extraído: $USER_ID"

# Verificar se o ID parece ser um UUID válido
if [[ ! "$USER_ID" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$ ]]; then
    echo -e "${RED}❌ ID do usuário inválido: $USER_ID${NC}"
    exit 1
fi

if [ -z "$USER_ID" ]; then
    echo -e "${RED}❌ Falha ao criar usuário via API:${NC}"
    echo "$CREATE_USER_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✅ Usuário criado com ID: $USER_ID${NC}"

# Substituir placeholder no sample-data.sql e aplicar
TEMP_SQL="/tmp/sample-data-temp.sql"
sed "s/{{USER_ID}}/$USER_ID/g" "$SAMPLE_DATA_FILE" > "$TEMP_SQL"

echo -e "${YELLOW}⏳ Inserindo dados de exemplo vinculados ao usuário...${NC}"

# Usar a API do Supabase para inserir os dados (com o token de serviço para ignorar RLS)
echo -e "${YELLOW}⏳ Inserindo dados via API do Supabase...${NC}"

# Primeiro, inserir o perfil do usuário
DATE_NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
curl -s -X POST "${SUPABASE_URL}/rest/v1/user_profiles" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d "{\
    \"id\": \"$USER_ID\",\
    \"email\": \"$USER_EMAIL\",\
    \"display_name\": \"$DISPLAY_NAME\",\
    \"created_at\": \"$DATE_NOW\",\
    \"updated_at\": \"$DATE_NOW\"\
  }"

# Agora, aplicar o SQL para inserir as transações
PGPASSWORD="postgres" psql -h "localhost" -p "54322" -d "postgres" -U "postgres" -f "$TEMP_SQL"

# Verificar se as transações foram inseridas (corrigindo a consulta SQL)
TRANSACTION_COUNT=$(PGPASSWORD="postgres" psql -h "localhost" -p "54322" -d "postgres" -U "postgres" -t -c "SELECT COUNT(*) FROM public.transactions WHERE user_id = '$USER_ID';" | tr -d '[:space:]')

# Verificar se a variável contém um número válido
if [[ "$TRANSACTION_COUNT" =~ ^[0-9]+$ ]] && [ "$TRANSACTION_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ $TRANSACTION_COUNT transações inseridas com sucesso para o usuário.${NC}"
else
    echo -e "${RED}❌ Falha ao inserir transações. Tentando método alternativo...${NC}"
    
    # Método alternativo: usar a API REST do Supabase para inserir algumas transações de exemplo
    curl -s -X POST "${SUPABASE_URL}/rest/v1/transactions" \
      -H "apikey: ${SUPABASE_KEY}" \
      -H "Authorization: Bearer ${SUPABASE_KEY}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=minimal" \
      -d "{\
        \"user_id\": \"$USER_ID\",\
        \"title\": \"Salário Exemplo\",\
        \"type\": \"income\",\
        \"category\": \"Salário\",\
        \"amount\": 5000.00\
      }"
    
    curl -s -X POST "${SUPABASE_URL}/rest/v1/transactions" \
      -H "apikey: ${SUPABASE_KEY}" \
      -H "Authorization: Bearer ${SUPABASE_KEY}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=minimal" \
      -d "{\
        \"user_id\": \"$USER_ID\",\
        \"title\": \"Aluguel Exemplo\",\
        \"type\": \"expense\",\
        \"category\": \"Moradia\",\
        \"amount\": 1500.00\
      }"
      
    echo -e "${GREEN}✅ Transações de exemplo inseridas via API.${NC}"
fi

rm "$TEMP_SQL"
echo -e "${GREEN}✅ Dados de exemplo inseridos com sucesso.${NC}"

# Finalização
echo -e "\n${GREEN}=== Project Setup Complete! ===${NC}"

echo -e "${YELLOW}Deseja iniciar o projeto agora? (s/n)${NC}"
read -r start_project

if [[ "$start_project" =~ ^[Ss]$ ]]; then
    echo -e "${GREEN}🚀 Iniciando o projeto...${NC}"
    "$PROJECT_ROOT/scripts/start-local.sh"
else
    echo -e "${YELLOW}💡 Para iniciar o projeto posteriormente, execute:${NC}"
    echo -e "${BLUE}   ./scripts/start-local.sh${NC}"
    echo -e "\n${YELLOW}💡 Serviços disponíveis:${NC}"
    echo -e "${BLUE}   • Backend: http://localhost:3002${NC}"
    echo -e "${BLUE}   • Frontend Auth: http://localhost:3000${NC}"
    echo -e "${BLUE}   • Frontend mobile: http://localhost:3003${NC}"
    echo -e "${BLUE}   • Supabase Studio: http://localhost:54334${NC}"
    echo -e "${BLUE}   • PostgreSQL: localhost:54333${NC}"
    echo -e "\n${GREEN}✨ Happy coding! ✨${NC}"
fi