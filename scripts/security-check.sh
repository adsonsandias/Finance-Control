#!/bin/bash

# 🔒 Script de Verificação de Segurança
# Execute este script antes de fazer deploy para produção

echo "🔍 Iniciando verificação de segurança..."
echo "==========================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de problemas
ISSUES=0

# Função para reportar problemas
report_issue() {
    echo -e "${RED}❌ PROBLEMA: $1${NC}"
    ((ISSUES++))
}

# Função para reportar sucesso
report_success() {
    echo -e "${GREEN}✅ OK: $1${NC}"
}

# Função para reportar aviso
report_warning() {
    echo -e "${YELLOW}⚠️  AVISO: $1${NC}"
}

echo "\n1. Verificando arquivos .env commitados..."
if git ls-files | grep -E "\.env$" > /dev/null; then
    report_issue "Arquivos .env encontrados no Git!"
    git ls-files | grep -E "\.env$"
else
    report_success "Nenhum arquivo .env commitado"
fi

echo "\n2. Verificando secrets hardcoded..."
SECRETS_FOUND=$(grep -r "password\s*=\s*['\"]\|secret\s*=\s*['\"]\|key\s*=\s*['\"]" --include="*.js" --include="*.ts" --include="*.json" . | grep -v node_modules | grep -v ".git" | grep -v "mock" | grep -v "example" | grep -v "test")
if [ ! -z "$SECRETS_FOUND" ]; then
    report_issue "Possíveis secrets hardcoded encontrados:"
    echo "$SECRETS_FOUND"
else
    report_success "Nenhum secret hardcoded encontrado"
fi

echo "\n3. Verificando senhas padrão..."
DEFAULT_PASSWORDS=$(grep -r "postgres123\|password123\|admin123\|secret123" --include="*.js" --include="*.ts" --include="*.yml" --include="*.yaml" . | grep -v node_modules | grep -v ".git" | grep -v "docker-compose.dev.yml" | grep -v ".env.example")
if [ ! -z "$DEFAULT_PASSWORDS" ]; then
    report_issue "Senhas padrão encontradas:"
    echo "$DEFAULT_PASSWORDS"
else
    report_success "Nenhuma senha padrão encontrada"
fi

echo "\n4. Verificando arquivos .env.example..."
if [ ! -f ".env.example" ]; then
    report_warning "Arquivo .env.example não encontrado na raiz"
else
    report_success "Arquivo .env.example encontrado"
fi

if [ ! -f "backend/.env.example" ]; then
    report_warning "Arquivo backend/.env.example não encontrado"
else
    report_success "Arquivo backend/.env.example encontrado"
fi

echo "\n5. Verificando .gitignore..."
if grep -q "\.env" .gitignore; then
    report_success "Arquivos .env estão no .gitignore"
else
    report_issue "Arquivos .env NÃO estão no .gitignore"
fi

echo "\n6. Verificando NODE_ENV em produção..."
if grep -r "NODE_ENV.*development" --include="*.js" --include="*.ts" . | grep -v node_modules | grep -v ".git" | grep -v "example" > /dev/null; then
    report_warning "NODE_ENV=development encontrado no código"
else
    report_success "NODE_ENV configurado corretamente"
fi

echo "\n7. Verificando logs sensíveis..."
SENSITIVE_LOGS=$(grep -r "console\.log.*password\|console\.log.*secret\|console\.log.*token" --include="*.js" --include="*.ts" . | grep -v node_modules | grep -v ".git" | grep -v "mock")
if [ ! -z "$SENSITIVE_LOGS" ]; then
    report_warning "Possíveis logs sensíveis encontrados:"
    echo "$SENSITIVE_LOGS"
else
    report_success "Nenhum log sensível encontrado"
fi

echo "\n==========================================="
echo "🔍 Verificação de segurança concluída"

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ Nenhum problema crítico encontrado!${NC}"
    echo -e "${GREEN}✅ Projeto pronto para produção${NC}"
    exit 0
else
    echo -e "${RED}❌ $ISSUES problema(s) crítico(s) encontrado(s)!${NC}"
    echo -e "${RED}❌ Corrija os problemas antes do deploy${NC}"
    exit 1
fi