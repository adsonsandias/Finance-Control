#!/bin/bash

# 🚀 Script to configure Supabase in the Finance Control project

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Finance Control - Supabase Configuration ===${NC}"

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
            echo -e "${BLUE}/bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"${NC}"
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
echo -e "\n${BLUE}=== Starting Supabase ===${NC}"
echo -e "${YELLOW}🔄 Checking Supabase status...${NC}"

# Check if Supabase is already running
if supabase status 2>/dev/null | grep -q "Started"; then
    echo -e "${GREEN}✅ Supabase is already running.${NC}"
else
    # Try to stop any existing Supabase instance first
    supabase stop 2>/dev/null || true
    sleep 2
    
    # Start Supabase with a different port if needed
    if ! supabase start; then
        echo -e "${YELLOW}⚠️ Failed to start Supabase with default ports. Trying with custom configuration...${NC}"
        
        # Create a temporary config file with different ports if it doesn't exist
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
            echo -e "${YELLOW}Created custom Supabase configuration with different ports.${NC}"
        fi
        
        # Try to start with the custom config
        if ! supabase start; then
            echo -e "${RED}❌ Failed to start Supabase.${NC}"
            echo -e "${YELLOW}💡 Try manually with: supabase stop && supabase start${NC}"
            echo -e "${YELLOW}💡 Or check if ports are already in use: lsof -i :54321 -i :54322 -i :54323${NC}"
            exit 1
        fi
    fi
fi

# Check if Supabase is running
echo -e "${YELLOW}⏳ Verifying Supabase status...${NC}"
if supabase status 2>/dev/null | grep -q "Started"; then
    echo -e "${GREEN}✅ Supabase started successfully!${NC}"
    
    # Get the Supabase Studio URL from status
    STUDIO_URL=$(supabase status | grep "Studio URL:" | awk '{print $3}')
    if [ -z "$STUDIO_URL" ]; then
        STUDIO_URL="http://localhost:54334"
    fi
    echo -e "${BLUE}🌐 Supabase Studio available at: $STUDIO_URL${NC}"
else
    echo -e "${RED}❌ Supabase is not running correctly.${NC}"
    echo -e "${YELLOW}💡 You may need to manually configure Supabase.${NC}"
    exit 1
fi

# Apply SQL schema
echo -e "\n${BLUE}=== Applying SQL Schema ===${NC}"
echo -e "${YELLOW}🔄 Applying SQL schema to Supabase...${NC}"

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Get the project root directory (parent of scripts directory)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Set paths relative to the project root
SCHEMA_PATH="$PROJECT_ROOT/apps/backend/supabase/migrations/supabase-schema.sql"
UPDATE_SCRIPT_PATH="$PROJECT_ROOT/scripts/update-supabase-schema.sh"

if [ -f "$UPDATE_SCRIPT_PATH" ]; then
    echo -e "${YELLOW}🔄 Running schema update script...${NC}"
    chmod +x "$UPDATE_SCRIPT_PATH"
    "$UPDATE_SCRIPT_PATH"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ SQL schema applied successfully!${NC}"
    else
        echo -e "${RED}❌ Failed to apply SQL schema via script. Trying manually...${NC}"
        if [ -f "$SCHEMA_PATH" ]; then
            echo -e "${YELLOW}🔄 Applying SQL schema manually...${NC}"
            psql -U postgres -d postgres -h localhost -p 54333 -f "$SCHEMA_PATH"
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ SQL schema applied manually with success!${NC}"
            else
                echo -e "${RED}❌ Failed to apply SQL schema manually.${NC}"
                echo -e "${YELLOW}💡 Verify if the file exists and try again:${NC}"
                echo -e "${BLUE}   psql -U postgres -d postgres -h localhost -p 54333 -f $SCHEMA_PATH${NC}"
                exit 1
            fi
        else
            echo -e "${RED}❌ SQL schema file not found: $SCHEMA_PATH${NC}"
            exit 1
        fi
    fi
else
    echo -e "${YELLOW}⚠️ Update script not found. Applying schema manually...${NC}"
    if [ -f "$SCHEMA_PATH" ]; then
        echo -e "${YELLOW}🔄 Applying SQL schema manually...${NC}"
        psql -U postgres -d postgres -h localhost -p 54322 -f "$SCHEMA_PATH"
        echo -e "${BLUE}   psql -U postgres -d postgres -h localhost -p 54322 -f $SCHEMA_PATH${NC}"
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ SQL schema applied manually with success!${NC}"
            else
                echo -e "${RED}❌ Failed to apply SQL schema manually.${NC}"
                echo -e "${YELLOW}💡 Verify if the file exists and try again:${NC}"
                echo -e "${BLUE}   psql -U postgres -d postgres -h localhost -p 54333 -f $SCHEMA_PATH${NC}"
                exit 1
            fi
    else
        echo -e "${RED}❌ SQL schema file not found: $SCHEMA_PATH${NC}"
        exit 1
    fi
fi

# Configure environment variables
echo -e "\n${BLUE}=== Configuring Environment Variables ===${NC}"
echo -e "${YELLOW}🔄 Checking Supabase environment variables...${NC}"

# Get Supabase URL and keys
SUPABASE_URL="http://localhost:54321"
SUPABASE_ANON_KEY=$(supabase status | grep "anon key:" | awk '{print $3}')
SUPABASE_SERVICE_ROLE_KEY=$(supabase status | grep "service_role key:" | awk '{print $3}')

if [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo -e "${RED}❌ Could not obtain Supabase keys.${NC}"
    echo -e "${YELLOW}💡 Verify that Supabase is running correctly.${NC}"
    echo -e "${YELLOW}💡 You can get the keys manually by running: supabase status${NC}"
else
    echo -e "${GREEN}✅ Supabase keys obtained successfully!${NC}"
    echo -e "${YELLOW}💡 Add the following variables to your .env file:${NC}"
    echo -e "${BLUE}SUPABASE_URL=$SUPABASE_URL${NC}"
    echo -e "${BLUE}SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY${NC}"
    echo -e "${BLUE}SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY${NC}"
    
    # Update backend .env file if it exists
    BACKEND_ENV_PATH="$PROJECT_ROOT/apps/backend/.env"
    if [ -f "$BACKEND_ENV_PATH" ]; then
        echo -e "${YELLOW}🔄 Updating backend .env file...${NC}"
        
        # Check if variables already exist and update or add them
        if grep -q "SUPABASE_URL" "$BACKEND_ENV_PATH"; then
            sed -i '' "s|SUPABASE_URL=.*|SUPABASE_URL=$SUPABASE_URL|g" "$BACKEND_ENV_PATH"
        else
            echo "SUPABASE_URL=$SUPABASE_URL" >> "$BACKEND_ENV_PATH"
        fi
        
        if grep -q "SUPABASE_ANON_KEY" "$BACKEND_ENV_PATH"; then
            sed -i '' "s|SUPABASE_ANON_KEY=.*|SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY|g" "$BACKEND_ENV_PATH"
        else
            echo "SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> "$BACKEND_ENV_PATH"
        fi
        
        if grep -q "SUPABASE_SERVICE_ROLE_KEY" "$BACKEND_ENV_PATH"; then
            sed -i '' "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY|g" "$BACKEND_ENV_PATH"
        else
            echo "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY" >> "$BACKEND_ENV_PATH"
        fi
        
        echo -e "${GREEN}✅ Backend .env file updated successfully!${NC}"
    else
        echo -e "${YELLOW}⚠️ Backend .env file not found.${NC}"
        echo -e "${YELLOW}💡 Create the .env file in the backend directory and add the variables manually.${NC}"
    fi
fi

echo -e "\n${GREEN}=== Supabase configuration completed successfully! ===${NC}"
echo -e "${YELLOW}💡 You can access Supabase Studio at: http://localhost:54334${NC}"
echo -e "${YELLOW}💡 To start the complete project, run: ./scripts/start-local.sh${NC}"

exit 0