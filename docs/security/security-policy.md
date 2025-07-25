# 🔒 Production Security Guide

## ⚠️ Security Checklist Before Deploy

### 1. Environment Variables
- [ ] All sensitive variables are in `.env` files (not committed)
- [ ] JWT_SECRET has at least 32 characters and is unique
- [ ] Database passwords are strong and unique
- [ ] Production URLs are configured correctly
- [ ] Development variables have been removed/changed

### 2. Sensitive Files
- [ ] No `.env` files are committed to Git
- [ ] Logs don't contain sensitive information
- [ ] Backup files are not in the repository
- [ ] Certificates and private keys are secure

### 3. Production Settings
- [ ] NODE_ENV is set to 'production'
- [ ] CORS is configured only for authorized domains
- [ ] Rate limiting is active
- [ ] Debug logs are disabled
- [ ] HTTPS is configured

## 🔑 Generating Secure Secrets

### JWT Secret
```bash
# Generate a secure JWT secret
openssl rand -base64 32
```

### Database Password
```bash
# Generate a strong password
openssl rand -base64 24
```

## 📋 Required Environment Variables

### Backend
```env
JWT_SECRET=<strong-secret-32-chars>
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

### Frontend
```env
REACT_APP_API_URL=https://api.your-domain.com
```

## 🚫 What to NEVER do

1. **Never commit .env files**
2. **Never use default passwords in production**
3. **Never expose secrets in logs**
4. **Never use HTTP in production**
5. **Never leave debug endpoints active**

## 🔍 Automated Checks

### Check for secrets in code
```bash
# Search for possible hardcoded secrets
grep -r "password\|secret\|key" --include="*.js" --include="*.ts" .
```

### Check .env files
```bash
# Check if .env files are committed
git ls-files | grep "\.env$"
```

## 📦 Secure Deploy

1. **Use cloud provider environment variables**
2. **Configure secrets in CI/CD**
3. **Always use HTTPS**
4. **Configure firewall properly**
5. **Monitor security logs**

## 🆘 In case of leak

1. **Immediately revoke** all exposed credentials
2. **Generate new** credentials
3. **Update** all configurations
4. **Monitor** suspicious activities
5. **Document** the incident

## 📞 Security Contact

In case of vulnerabilities found, contact through the project's official channels.