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

# Install frontend auth dependencies
echo -e "${YELLOW}⏳ Installing frontend auth dependencies...${NC}"
cd "$PROJECT_ROOT/apps/frontend/auth"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing frontend auth dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Frontend auth dependencies installed.${NC}"

# Install frontend dashboard dependencies
echo -e "${YELLOW}⏳ Installing frontend dashboard dependencies...${NC}"
cd "$PROJECT_ROOT/apps/frontend/dashboard"
if [ ! -d "node_modules" ]; then
    npm install --no-fund --no-audit || {
        echo -e "${YELLOW}⚠️ Error installing frontend dashboard dependencies. Trying with --legacy-peer-deps...${NC}"
        npm install --no-fund --no-audit --legacy-peer-deps
    }
fi
echo -e "${GREEN}✅ Frontend dashboard dependencies installed.${NC}"

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

# Execute o script de configuração do Supabase
echo -e "${YELLOW}⏳ Executando script de configuração do Supabase...${NC}"
chmod +x "$PROJECT_ROOT/scripts/setup-supabase.sh"
"$PROJECT_ROOT/scripts/setup-supabase.sh"

# Verificar se o Supabase foi iniciado com sucesso
if ! supabase status &> /dev/null; then
    echo -e "${RED}❌ Falha ao iniciar o Supabase. Tentando novamente...${NC}"
    
    # Tentar parar qualquer instância existente do Supabase primeiro
    supabase stop &> /dev/null || true
    sleep 2
    
    # Iniciar o Supabase com uma porta diferente, se necessário
    if ! supabase start; then
        echo -e "${YELLOW}⚠️ Falha ao iniciar o Supabase com as portas padrão. Tentando com configuração personalizada...${NC}"
        
        # Criar um arquivo de configuração temporário com portas diferentes, se não existir
        if [ ! -f "$PROJECT_ROOT/supabase/config.toml" ]; then
            mkdir -p "$PROJECT_ROOT/supabase"
            cat > "$PROJECT_ROOT/supabase/config.toml" << EOF
[api]
port = 54321
[db]
port = 54323
[studio]
port = 54324
EOF
            echo -e "${YELLOW}Criada configuração personalizada do Supabase com portas diferentes.${NC}"
        fi
        
        # Tentar iniciar com a configuração personalizada
        if ! supabase start; then
            echo -e "${RED}❌ Falha ao iniciar o Supabase. Tente manualmente: supabase start${NC}"
            exit 1
        fi
    fi
fi

# Aplicar o schema SQL e dados de exemplo
echo -e "${YELLOW}⏳ Aplicando schema SQL e dados de exemplo...${NC}"

# Caminho para os arquivos SQL
SCHEMA_FILE="$PROJECT_ROOT/apps/backend/supabase/migrations/supabase-schema.sql"
SAMPLE_DATA_FILE="$PROJECT_ROOT/apps/backend/supabase/migrations/sample-data.sql"

# Verificar se os arquivos existem
if [ ! -f "$SCHEMA_FILE" ]; then
    echo -e "${RED}❌ Arquivo de schema não encontrado: $SCHEMA_FILE${NC}"
    exit 1
fi

# Aplicar o schema usando psql
echo -e "${YELLOW}🔄 Aplicando schema usando psql...${NC}"
PGPASSWORD="postgres" psql -h "localhost" -p "54333" -d "postgres" -U "postgres" -f "$SCHEMA_FILE"

# Aplicar os dados de exemplo, se o arquivo existir
if [ -f "$SAMPLE_DATA_FILE" ]; then
    echo -e "${YELLOW}🔄 Aplicando dados de exemplo...${NC}"
    PGPASSWORD="postgres" psql -h "localhost" -p "54333" -d "postgres" -U "postgres" -f "$SAMPLE_DATA_FILE"
    echo -e "${GREEN}✅ Dados de exemplo aplicados com sucesso!${NC}"
else
    echo -e "${YELLOW}⚠️ Arquivo de dados de exemplo não encontrado: $SAMPLE_DATA_FILE${NC}"
fi

echo -e "\n${GREEN}=== Project Setup Complete! ===${NC}"

# Perguntar ao usuário se deseja iniciar o projeto
echo -e "${YELLOW}Deseja iniciar o projeto agora? (s/n)${NC}"
read -r start_project

if [[ "$start_project" =~ ^[Ss]$ ]]; then
    echo -e "${GREEN}🚀 Iniciando o projeto...${NC}"
    "$PROJECT_ROOT/scripts/start-local.sh"
else
    echo -e "${YELLOW}💡 Para iniciar o projeto posteriormente, execute:${NC}"
    echo -e "${BLUE}   ./scripts/start-local.sh${NC}"
    echo -e "\n${YELLOW}💡 Available services:${NC}"
    echo -e "${BLUE}   • Backend: http://localhost:3002${NC}"
    echo -e "${BLUE}   • Frontend Auth: http://localhost:3000${NC}"
    echo -e "${BLUE}   • Frontend Dashboard: http://localhost:3003${NC}"
    echo -e "${BLUE}   • Supabase Studio: http://localhost:54334${NC}"
    echo -e "${BLUE}   • PostgreSQL: localhost:54333${NC}"

    echo -e "\n${GREEN}✨ Happy coding! ✨${NC}"
fi