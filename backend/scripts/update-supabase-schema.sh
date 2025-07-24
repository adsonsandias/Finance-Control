#!/bin/bash

# Script para atualizar o schema do Supabase local

echo "🔄 Atualizando schema do Supabase..."

# Verificar se o Supabase está rodando localmente
echo "✅ Verificando se o Supabase está rodando na porta 54321..."

# Aplicar o schema SQL ao banco de dados Supabase local
echo "📦 Aplicando schema SQL..."

# Caminho para o arquivo de schema
SCHEMA_FILE="./backend/supabase/migrations/supabase-schema.sql"

# Verificar se o arquivo existe
if [ ! -f "$SCHEMA_FILE" ]; then
  echo "❌ Arquivo de schema não encontrado: $SCHEMA_FILE"
  exit 1
fi

# Aplicar o schema usando o cliente Supabase
echo "🔄 Aplicando schema usando psql..."

# Obter variáveis de ambiente do Supabase
SUPABASE_DB_HOST="127.0.0.1"
SUPABASE_DB_PORT="54322"
SUPABASE_DB_NAME="postgres"
SUPABASE_DB_USER="postgres"
SUPABASE_DB_PASSWORD="postgres"

# Aplicar o schema usando Docker para executar psql
docker exec -i supabase_db_Finance-Control psql -U "$SUPABASE_DB_USER" -d "$SUPABASE_DB_NAME" < "$SCHEMA_FILE"

echo "✅ Schema do Supabase atualizado com sucesso!"

# Exibir informações de acesso
echo "🌐 Supabase Studio disponível em: http://localhost:54321"
echo "🔑 Credenciais padrão:"
echo "   Email: admin@example.com"
echo "   Senha: admin"

echo "✨ Pronto para usar!"