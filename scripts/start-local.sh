#!/bin/bash

# 🚀 Script to start all services locally
# Run this script to start the development environment

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Save the original directory
ORIGINAL_DIR=$(pwd)

# Function to kill processes using specific ports
kill_process_on_port() {
  local port=$1
  local pid=$(lsof -t -i:$port)
  if [ -n "$pid" ]; then
    echo -e "${YELLOW}⚠️ Process found on port $port (PID: $pid). Terminating...${NC}"
    kill -9 $pid 2>/dev/null || true
    sleep 1
  fi
}

# Clear ports that will be used
echo -e "${YELLOW}🧹 Clearing ports in use...${NC}"
kill_process_on_port 3000  # Frontend Auth
kill_process_on_port 3002  # Backend
kill_process_on_port 3003  # Frontend Dashboard

echo -e "${GREEN}🚀 Starting development environment...${NC}"
echo "=========================================="

# Check and install root project dependencies
echo -e "${YELLOW}🔍 Checking root project dependencies...${NC}"
cd "$(dirname "$0")"
cd ".." || { echo -e "${RED}❌ Root directory not found!${NC}"; exit 1; }
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Installing root project dependencies...${NC}"
  npm install
fi

# Check and install shared package dependencies
echo -e "${YELLOW}🔍 Checking shared package dependencies...${NC}"
cd "packages" || { echo -e "${RED}❌ Shared packages directory not found!${NC}"; exit 1; }
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Installing shared package dependencies...${NC}"
  npm install
fi
cd "$ORIGINAL_DIR"


# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running!${NC}"
    echo -e "${YELLOW}💡 Start Docker and try again${NC}"
    exit 1
fi

# Check if psql command is available
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL client (psql) is not installed!${NC}"
    echo -e "${YELLOW}💡 Please install PostgreSQL client:${NC}"
    echo -e "${BLUE}   - macOS: brew install postgresql${NC}"
    echo -e "${BLUE}   - Ubuntu/Debian: sudo apt-get install postgresql-client${NC}"
    echo -e "${BLUE}   - Windows: Install from https://www.postgresql.org/download/windows/${NC}"
    exit 1
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⏳ Installing Supabase CLI...${NC}"
    
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
    echo -e "${GREEN}✅ Supabase CLI found.${NC}"
fi

# Start Supabase locally
echo -e "${YELLOW}🔄 Starting Supabase...${NC}"
supabase status &> /dev/null || supabase start

# Check if Supabase is running
echo -e "${YELLOW}⏳ Checking Supabase status...${NC}"
if ! supabase status | grep -q "Started"; then
    echo -e "${YELLOW}⚠️ Supabase may not be running correctly. Trying to restart...${NC}"
    supabase stop && supabase start
fi
echo -e "${GREEN}✅ Supabase started successfully!${NC}"
echo -e "${BLUE}🌐 Supabase Studio available at: http://localhost:54334${NC}"

# Start PostgreSQL database for compatibility
echo -e "${YELLOW}🐘 Starting PostgreSQL...${NC}"
cd "$(dirname "$0")"
cd "../infra/docker" || { echo -e "${RED}❌ Infrastructure directory not found!${NC}"; exit 1; }
docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d db
cd "$ORIGINAL_DIR"

# Check if database is running
echo -e "${YELLOW}⏳ Waiting for PostgreSQL to start...${NC}"
sleep 5
if ! docker ps | grep -q "finance_db"; then
    echo -e "${RED}❌ Failed to start PostgreSQL!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL started successfully!${NC}"

# Start the backend
echo -e "${YELLOW}🚀 Starting backend...${NC}"
cd "$(dirname "$0")"
cd "../apps/backend" || { echo -e "${RED}❌ Backend directory not found!${NC}"; exit 1; }

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Installing backend dependencies...${NC}"
  npm install
fi

# Check if nodemon is installed
if ! npm list -g nodemon > /dev/null 2>&1; then
  echo -e "${YELLOW}⏳ Installing nodemon globally...${NC}"
  npm install -g nodemon
fi

npm run dev &
BACKEND_PID=$!
cd "$ORIGINAL_DIR"

# Wait for backend to start
echo -e "${YELLOW}⏳ Waiting for backend to start...${NC}"
sleep 5

# Start the authentication frontend
echo -e "${YELLOW}🚀 Starting authentication frontend...${NC}"
cd "$(dirname "$0")"
cd "../apps/frontend/auth" || { echo -e "${RED}❌ Authentication directory not found!${NC}"; exit 1; }

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Installing authentication frontend dependencies...${NC}"
  npm install
fi

# Use port 3000 for authentication module
PORT=3000 npm start &
AUTH_PID=$!
cd "$ORIGINAL_DIR"

# Start the dashboard frontend
echo -e "${YELLOW}🚀 Starting dashboard frontend...${NC}"
cd "$(dirname "$0")"
cd "../apps/frontend/dashboard" || { echo -e "${RED}❌ Dashboard directory not found!${NC}"; exit 1; }

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⏳ Installing dashboard frontend dependencies...${NC}"
  npm install
fi

# Use port 3003 for dashboard module
PORT=3003 npm start &
DASHBOARD_PID=$!
cd "$ORIGINAL_DIR"

echo "=========================================="
echo -e "${GREEN}✅ All services have been started!${NC}"
echo -e "${BLUE}📊 Available services:${NC}"
echo -e "${BLUE}   • Backend: http://localhost:3002${NC}"
echo -e "${BLUE}   • Frontend Auth: http://localhost:3000${NC}"
echo -e "${BLUE}   • Frontend Dashboard: http://localhost:3003${NC}"
echo -e "${BLUE}   • Supabase Studio: http://localhost:54334${NC}"
echo -e "${BLUE}   • PostgreSQL: localhost:54333${NC}"
echo ""
echo -e "${YELLOW}💡 Press Ctrl+C to stop all services${NC}"

# Cleanup function on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down all services...${NC}"
    
    # Kill processes
    kill $BACKEND_PID 2>/dev/null
    kill $AUTH_PID 2>/dev/null
    kill $DASHBOARD_PID 2>/dev/null
    
    # Stop Docker containers
    docker stop finance_db finance_meta 2>/dev/null || true
    
    echo -e "${GREEN}All services have been terminated.${NC}"
    exit 0
}

# Register cleanup function to run on exit
trap cleanup SIGINT SIGTERM

# Wait to keep the script running
wait