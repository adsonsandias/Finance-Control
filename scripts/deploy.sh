#!/bin/bash

# 🚀 Script de Deploy para Produção
# Execute este script para fazer deploy da aplicação

set -e  # Exit on any error

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando processo de deploy...${NC}"
echo "=========================================="

# Verificar se estamos no branch main
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  Você não está no branch main (branch atual: $CURRENT_BRANCH)${NC}"
    read -p "Deseja continuar mesmo assim? (s/N): " CONTINUE
    if [ "$CONTINUE" != "s" ] && [ "$CONTINUE" != "S" ]; then
        echo -e "${YELLOW}🛑 Deploy cancelado${NC}"
        exit 0
    fi
fi

# Verificar se há alterações não commitadas
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Existem alterações não commitadas${NC}"
    git status --short
    read -p "Deseja continuar mesmo assim? (s/N): " CONTINUE
    if [ "$CONTINUE" != "s" ] && [ "$CONTINUE" != "S" ]; then
        echo -e "${YELLOW}🛑 Deploy cancelado${NC}"
        exit 0
    fi
fi

# Executar verificação de segurança
echo -e "${YELLOW}🔍 Executando verificação de segurança...${NC}"
if ! ./scripts/security-check.sh; then
    echo -e "${RED}❌ Verificação de segurança falhou!${NC}"
    echo -e "${YELLOW}💡 Corrija os problemas antes de continuar${NC}"
    exit 1
fi

# Fazer backup do banco de dados
echo -e "${YELLOW}💾 Fazendo backup do banco de dados...${NC}"
if ! ./scripts/backup.sh; then
    echo -e "${YELLOW}⚠️  Não foi possível fazer backup do banco de dados${NC}"
    read -p "Deseja continuar mesmo assim? (s/N): " CONTINUE
    if [ "$CONTINUE" != "s" ] && [ "$CONTINUE" != "S" ]; then
        echo -e "${YELLOW}🛑 Deploy cancelado${NC}"
        exit 0
    fi
fi

# Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm ci

# Executar testes
echo -e "${YELLOW}🧪 Executando testes...${NC}"
npm test

# Fazer build
echo -e "${YELLOW}🔨 Fazendo build...${NC}"
npm run build

# Fazer deploy para o ambiente de produção
echo -e "${YELLOW}🚀 Fazendo deploy para produção...${NC}"

# Aqui você pode adicionar comandos específicos para o seu ambiente de produção
# Por exemplo:
# - Copiar arquivos para um servidor via SCP
# - Fazer push para um repositório que aciona um pipeline de CI/CD
# - Fazer deploy para um serviço de hospedagem como Heroku, Vercel, etc.

# Exemplo para deploy via Docker
echo -e "${YELLOW}🐳 Construindo e enviando imagens Docker...${NC}"

# Construir e enviar imagem do backend
echo -e "${YELLOW}🔨 Construindo imagem do backend...${NC}"
docker build -t finance-control-backend:latest -f ./apps/backend/Dockerfile.backend ./apps/backend

# Construir e enviar imagem do frontend-auth
echo -e "${YELLOW}🔨 Construindo imagem do frontend-auth...${NC}"
docker build -t finance-control-auth:latest -f ./apps/frontend/auth/Dockerfile ./apps/frontend/auth

# Construir e enviar imagem do frontend-dashboard
echo -e "${YELLOW}🔨 Construindo imagem do frontend-dashboard...${NC}"
docker build -t finance-control-dashboard:latest -f ./apps/frontend/dashboard/Dockerfile ./apps/frontend/dashboard

# Se você tiver um registro Docker configurado, você pode fazer push das imagens
# docker tag finance-control-backend:latest seu-registro/finance-control-backend:latest
# docker push seu-registro/finance-control-backend:latest
# Repita para as outras imagens

# Exemplo para deploy em um servidor remoto via SSH
echo -e "${YELLOW}🖥️  Atualizando servidor remoto...${NC}"
echo -e "${BLUE}💡 Para configurar o deploy remoto, edite este script e adicione os comandos SSH necessários${NC}"

# Exemplo:
# ssh usuario@seu-servidor.com "cd /caminho/para/aplicacao && git pull && docker-compose up -d"

echo "=========================================="
echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${YELLOW}💡 Verifique se a aplicação está funcionando corretamente${NC}"