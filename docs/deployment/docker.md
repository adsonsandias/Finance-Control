# Finance Control - Docker Setup

This project includes a complete Docker configuration with local Supabase for development.

## 🐳 Docker Configuration

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Service Structure

The `docker-compose.yml` includes the following services:

- **Frontend Auth**: React application for authentication (port 3000)
- **Frontend Dashboard**: React application for dashboard (port 3003)
- **Backend**: Node.js API (port 3002)
- **Database**: PostgreSQL 15 (port 5432)
- **Supabase Studio**: Admin interface (port 54323)
- **Kong**: API Gateway (port 8000)
- **Auth**: GoTrue authentication service
- **REST**: PostgREST API
- **Realtime**: Real-time service
- **Storage**: Storage service
- **ImgProxy**: Image processing

### How to Run

1. **Clone the repository and navigate to the folder:**
   ```bash
   cd Finance-Control
   ```

2. **Copy the environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start all services including the database:**
   ```bash
   ./scripts/start-local.sh
   ```

4. **Wait for all services to start** (may take a few minutes on first run)

5. **Access the applications:**
   - **Frontend Auth**: http://localhost:3000
   - **Frontend Dashboard**: http://localhost:3003
   - **Backend API**: http://localhost:3001
   - **Supabase Studio**: http://localhost:54323

### Useful Commands

```bash
# Start all services including the database
./scripts/start-local.sh

# Stop all services
./scripts/cleanup.sh

# View logs of all services
docker-compose logs -f

# View logs of a specific service
docker-compose logs -f frontend-auth
docker-compose logs -f frontend-dashboard
docker-compose logs -f backend
docker-compose logs -f db

# Stop and remove volumes (CAUTION: deletes database data)
docker-compose down -v

# Rebuild the frontend
docker-compose build frontend-auth
docker-compose build frontend-dashboard
docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d frontend-auth frontend-dashboard

# Run commands in the frontend container
docker-compose exec frontend-auth npm install
docker-compose exec frontend-auth npm run build
docker-compose exec frontend-dashboard npm install
docker-compose exec frontend-dashboard npm run build

# Access the database
docker-compose exec db psql -U postgres -d finance_control

# Apply the Supabase schema
./scripts/update-supabase-schema.sh

# Check security before deployment
./scripts/security-check.sh

# Backup the database
./scripts/backup.sh

# Restore database backup
./scripts/restore.sh [backup-file-name]
```

### Database Configuration

```


The database is automatically configured with:

- **User**: postgres
- **Password**: postgres
- **Database**: finance_control
- **Port**: 5432

Tables and policies are automatically created through the file `apps/backend/supabase/migrations/supabase-schema.sql`.

### Supabase Studio

Access http://localhost:54323 to use the Supabase administrative interface.

**Default credentials:**
- **URL**: http://localhost:8000
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU`

### Development

For active development:

1. **Development mode with hot reload:**
   ```bash
   # The frontend is already configured for hot reload
   # Any changes to src/ files will be automatically reflected
   ```

2. **Install new dependencies:**
   ```bash
   # Stop the container
   docker-compose stop frontend-auth
   
   # Install dependencies locally
   npm install new-dependency
   
   # Rebuild and restart
   docker-compose build frontend-auth
   docker-compose up -d frontend-auth
   ```

### Google Authentication (Optional)

To configure Google authentication:

1. **Configure credentials in Google Cloud Console**
2. **Update docker-compose.yml** in the `auth` service variables:
   ```yaml
   GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID: "your-client-id"
   GOTRUE_EXTERNAL_GOOGLE_SECRET: "your-client-secret"
   ```
3. **Restart services:**
   ```bash
   docker-compose restart auth kong
   ```

### Troubleshooting

#### Problem: Services don't start
```bash
# Check logs
docker-compose logs

# Check if ports are available
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
```

#### Problem: Database doesn't connect
```bash
# Check if PostgreSQL is running
docker-compose ps db

# Test connection
docker-compose exec db pg_isready -U postgres
```

#### Problem: Frontend doesn't load
```bash
# Check frontend logs
docker-compose logs frontend-auth
docker-compose logs frontend-dashboard

# Rebuild frontend
docker-compose build --no-cache frontend-auth
docker-compose up -d frontend-auth
```

#### Problem: CORS error
- Check if Kong is running: `docker-compose ps kong`
- Check configuration in `supabase/kong.yml`

### Cleanup

To completely clean up the environment:

```bash
# Stop all containers and remove volumes
docker-compose down -v

# Remove unused images
docker image prune -f

# Remove orphaned volumes
docker volume prune -f
```

### Docker File Structure

```
├── infra/docker/
│   ├── docker-compose.yml          # Main configuration
│   ├── docker-compose.db.yml       # Database configuration
│   └── docker-compose.dev.yml      # Development overrides
├── apps/frontend/
│   ├── auth/Dockerfile             # Auth frontend Dockerfile
│   └── dashboard/Dockerfile        # Dashboard frontend Dockerfile
├── apps/backend/
│   └── Dockerfile.backend          # Backend Dockerfile
├── .dockerignore                   # Files ignored in build
├── .env.example                    # Environment variables
└── apps/backend/supabase/
    └── migrations/
        └── supabase-schema.sql     # Complete database schema
```

### Monitoring

To monitor the status of services:

```bash
# Status of all services
docker-compose ps

# Resource usage
docker stats

# Real-time logs
docker-compose logs -f --tail=100
```

---

## 🚀 Next Steps

1. Run `docker-compose up -d`
2. Access http://localhost:3000
3. Create a test account
4. Explore Supabase Studio at http://localhost:54323
5. Start developing!

For more information about Supabase, check the `docs/development/supabase-setup.md` file.