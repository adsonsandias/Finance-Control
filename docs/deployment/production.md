# 🚀 Production Deployment Guide

## ✅ Prerequisites

1. **Security Check**
   ```bash
   ./scripts/security-check.sh
   ```
   ✅ Must pass without critical issues

2. **Production Server**
   - Docker and Docker Compose installed
   - Domain configured
   - SSL certificate configured
   - Firewall configured

## 🔧 Production Configuration

### 1. Configure Environment Variables

```bash
# Copy production template
cp .env.docker.example .env.docker
```

**Edit `.env.docker` with production values:**

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
REACT_APP_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Backend Configuration
JWT_SECRET=YOUR_JWT_SECRET_32_CHARS_HERE
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com

# Frontend Configuration
REACT_APP_API_URL=https://api.your-domain.com/api
```

### 2. Generate Secure Secrets

```bash
# JWT Secret (32+ characters)
openssl rand -base64 32

# Database password (24 characters)
openssl rand -base64 24
```

## 🐳 Docker Deployment

### 1. Build and Deploy

```bash
# Build images
docker-compose build

# Run in production
docker-compose --env-file .env.docker up -d
```

### 2. Check Status

```bash
# Check containers
docker-compose ps

# Check logs
docker-compose logs -f

# Check database health
docker-compose exec db pg_isready -U finance_user
```

### 3. Configure Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔒 Security Configurations

### 1. Firewall

```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 2. Database Backup

```bash
# Create backup
docker-compose exec db pg_dump -U finance_user finance_control_prod > backup.sql

# Restore backup
docker-compose exec -T db psql -U finance_user finance_control_prod < backup.sql
```

### 3. Monitoring

```bash
# Check resource usage
docker stats

# Check error logs
docker-compose logs backend | grep ERROR

# Check database connections
docker-compose exec db psql -U finance_user -d finance_control_prod -c "SELECT count(*) FROM pg_stat_activity;"
```

## 🔄 Updates

### 1. Deploy New Version

```bash
# Create backup
./scripts/backup.sh

# Stop containers
docker-compose down

# Update code
git pull origin main

# Check security
./scripts/security-check.sh

# Rebuild and restart
docker-compose build
docker-compose --env-file .env.docker up -d
```

### 2. Rollback

```bash
# Go back to previous version
git checkout <previous-commit>
docker-compose build
docker-compose --env-file .env.docker up -d
```

## 📊 Production Monitoring

### Important Metrics

- **Uptime**: Application availability
- **Response Time**: API response time
- **Error Rate**: 4xx/5xx error rate
- **Database Connections**: Active database connections
- **Memory Usage**: Container memory usage
- **Disk Space**: Available disk space

### Recommended Alerts

- CPU > 80% for 5 minutes
- Memory > 90% for 5 minutes
- Disk > 85%
- Error rate > 5%
- Response time > 2 seconds

## 🆘 Troubleshooting

### Common Issues

1. **Container won't start**
   ```bash
   docker-compose logs <service-name>
   ```

2. **Database connection error**
   ```bash
   docker-compose exec backend env | grep DATABASE
   docker-compose exec db pg_isready
   ```

3. **CORS error**
   - Check CORS_ORIGIN in .env.docker
   - Check reverse proxy configuration

4. **Invalid JWT**
   - Check JWT_SECRET
   - Check server time synchronization

### Important Logs

```bash
# Backend logs
docker-compose logs -f backend

# Database logs
docker-compose logs -f db

# System logs
sudo journalctl -u docker
```

## 📞 Support

In case of production issues:

1. Check container logs
2. Check system metrics
3. Consult this troubleshooting guide
4. Contact the development team

---

**⚠️ IMPORTANT**: Always test in staging environment before deploying to production!