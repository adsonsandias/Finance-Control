# Finance Control - Docker Setup

Este projeto agora inclui uma configuração completa do Docker com Supabase local para desenvolvimento.

## 🐳 Configuração com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Estrutura dos Serviços

O `docker-compose.yml` inclui os seguintes serviços:

- **Frontend**: Aplicação React (porta 3000)
- **Database**: PostgreSQL 15 (porta 5432)
- **Supabase Studio**: Interface administrativa (porta 54323)
- **Kong**: API Gateway (porta 8000)
- **Auth**: Serviço de autenticação GoTrue
- **REST**: API PostgREST
- **Realtime**: Serviço de tempo real
- **Storage**: Serviço de armazenamento
- **ImgProxy**: Processamento de imagens

### Como executar

1. **Clone o repositório e navegue até a pasta:**
   ```bash
   cd Finance-Control
   ```

2. **Copie o arquivo de ambiente:**
   ```bash
   cp .env.example .env
   ```

3. **Inicie todos os serviços incluindo o banco de dados:**
   ```bash
   ./backend/scripts/start-services.sh
   ```

4. **Aguarde todos os serviços iniciarem** (pode levar alguns minutos na primeira vez)

5. **Acesse as aplicações:**
   - **Frontend Auth**: http://localhost:3000
   - **Frontend Dashboard**: http://localhost:3001
   - **Backend API**: http://localhost:3002
   - **Supabase Studio**: http://localhost:54323

### Comandos úteis

```bash
# Iniciar todos os serviços incluindo o banco de dados
./backend/scripts/start-services.sh

# Parar todos os serviços
./backend/scripts/stop-services.sh

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f frontend-auth
docker-compose logs -f frontend-dashboard
docker-compose logs -f backend
docker-compose logs -f db

# Parar e remover volumes (CUIDADO: apaga dados do banco)
docker-compose down -v

# Rebuild do frontend
docker-compose build frontend-auth
docker-compose build frontend-dashboard
docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d frontend-auth frontend-dashboard

# Executar comandos no container do frontend
docker-compose exec frontend-auth npm install
docker-compose exec frontend-auth npm run build
docker-compose exec frontend-dashboard npm install
docker-compose exec frontend-dashboard npm run build

# Acessar o banco de dados
docker-compose exec db psql -U postgres -d finance_control

# Aplicar o schema do Supabase
./backend/scripts/update-supabase-schema.sh

# Verificar segurança antes do deploy
./backend/scripts/security-check.sh

# Fazer backup do banco de dados
./backend/scripts/backup.sh

# Restaurar backup do banco de dados
./backend/scripts/restore.sh [nome-do-arquivo-de-backup]
```

### Configuração do Banco de Dados

O banco de dados é automaticamente configurado com:

- **Usuário**: postgres
- **Senha**: your-super-secret-and-long-postgres-password
- **Database**: postgres
- **Porta**: 5432

As tabelas e políticas são criadas automaticamente através do arquivo `backend/supabase/migrations/supabase-schema.sql`.

### Supabase Studio

Acesse http://localhost:54323 para usar a interface administrativa do Supabase.

**Credenciais padrão:**
- **URL**: http://localhost:8000
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU`

### Desenvolvimento

Para desenvolvimento ativo:

1. **Modo de desenvolvimento com hot reload:**
   ```bash
   # O frontend já está configurado para hot reload
   # Qualquer mudança nos arquivos src/ será refletida automaticamente
   ```

2. **Instalar novas dependências:**
   ```bash
   # Pare o container
   docker-compose stop frontend
   
   # Instale as dependências localmente
   npm install nova-dependencia
   
   # Rebuild e reinicie
   docker-compose build frontend
   docker-compose up -d frontend
   ```

### Autenticação Google (Opcional)

Para configurar autenticação com Google:

1. **Configure as credenciais no Google Cloud Console**
2. **Atualize o docker-compose.yml** nas variáveis do serviço `auth`:
   ```yaml
   GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID: "seu-client-id"
   GOTRUE_EXTERNAL_GOOGLE_SECRET: "seu-client-secret"
   ```
3. **Reinicie os serviços:**
   ```bash
   docker-compose restart auth kong
   ```

### Troubleshooting

#### Problema: Serviços não iniciam
```bash
# Verifique os logs
docker-compose logs

# Verifique se as portas estão disponíveis
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
```

#### Problema: Banco de dados não conecta
```bash
# Verifique se o PostgreSQL está rodando
docker-compose ps db

# Teste a conexão
docker-compose exec db pg_isready -U postgres
```

#### Problema: Frontend não carrega
```bash
# Verifique os logs do frontend
docker-compose logs frontend

# Rebuild do frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

#### Problema: Erro de CORS
- Verifique se o Kong está rodando: `docker-compose ps kong`
- Verifique a configuração em `supabase/kong.yml`

### Limpeza

Para limpar completamente o ambiente:

```bash
# Para todos os containers e remove volumes
docker-compose down -v

# Remove imagens não utilizadas
docker image prune -f

# Remove volumes órfãos
docker volume prune -f
```

### Estrutura de Arquivos Docker

```
├── docker-compose.yml          # Configuração principal
├── Dockerfile.frontend         # Dockerfile do React
├── .dockerignore              # Arquivos ignorados no build
├── .env.example               # Variáveis de ambiente
└── supabase/
    ├── supabase-schema.sql    # Schema completo do banco
    └── kong.yml               # Configuração do API Gateway
```

### Monitoramento

Para monitorar o status dos serviços:

```bash
# Status de todos os serviços
docker-compose ps

# Uso de recursos
docker stats

# Logs em tempo real
docker-compose logs -f --tail=100
```

---

## 🚀 Próximos Passos

1. Execute `docker-compose up -d`
2. Acesse http://localhost:3000
3. Crie uma conta de teste
4. Explore o Supabase Studio em http://localhost:54323
5. Comece a desenvolver!

Para mais informações sobre o Supabase, consulte o arquivo `SUPABASE_SETUP.md`.