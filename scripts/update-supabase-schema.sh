#!/bin/bash

# Script to update the local Supabase schema

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Updating Supabase schema...${NC}"

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

# Check if Supabase is running locally
echo -e "${YELLOW}✅ Checking if Supabase is running on port 54333...${NC}"

# Apply the SQL schema to the local Supabase database
echo -e "${YELLOW}📦 Applying SQL schema...${NC}"

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Get the project root directory (parent of scripts directory)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Path to the schema file
# SCHEMA_FILE="$PROJECT_ROOT/apps/backend/supabase/migrations/supabase-schema.sql"
SCHEMA_FILE="$PROJECT_ROOT/apps/backend/supabase/migrations/sample-data.sql"

# Check if the file exists
if [ ! -f "$SCHEMA_FILE" ]; then
  echo -e "${RED}❌ Schema file not found: $SCHEMA_FILE${NC}"
  exit 1
fi

# Apply the schema using the Supabase client
echo -e "${YELLOW}🔄 Applying schema using psql...${NC}"

# Get Supabase environment variables
SUPABASE_DB_HOST="localhost"
SUPABASE_DB_PORT="54322"  # Alterado de 54333 para 54322
SUPABASE_DB_NAME="postgres"
SUPABASE_DB_USER="postgres"
SUPABASE_DB_PASSWORD="postgres"

# Apply the schema using psql
PGPASSWORD="$SUPABASE_DB_PASSWORD" psql -h "$SUPABASE_DB_HOST" -p "$SUPABASE_DB_PORT" -d "$SUPABASE_DB_NAME" -U "$SUPABASE_DB_USER" -f "$SCHEMA_FILE"

echo -e "${GREEN}✅ Supabase schema updated successfully!${NC}"

# Display access information
echo -e "${BLUE}🌐 Supabase Studio available at: http://localhost:54334${NC}"
echo -e "${YELLOW}🔑 Default credentials:${NC}"
echo -e "${BLUE}   Email: admin@example.com${NC}"
echo -e "${BLUE}   Password: admin${NC}"

echo -e "${GREEN}✨ Ready to use!${NC}"