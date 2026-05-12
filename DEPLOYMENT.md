# Realista Deployment Guide

## 🚀 Railway Deployment

### Prerequisites
- GitHub account linked to Railway
- Railway project created (or will be auto-created)
- Google OAuth credentials (if using Google sign-in)

---

## 📋 Deployment Steps

### 1. Push Code to GitHub
```bash
git push origin main
```

### 2. Create Railway Project
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `s-counago/realista`
5. Railway will auto-detect:
   - **Backend**: Spring Boot (via `pom.xml`)
   - **Frontend**: Next.js (via `package.json`)

### 3. Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create and link the database

### 4. Configure Backend Environment Variables

Go to Backend service → Variables tab and add:

```bash
# Database (Railway auto-provides these, or copy from PostgreSQL service)
DATABASE_URL=jdbc:postgresql://[from Railway PostgreSQL service]
DATABASE_USER=[from Railway PostgreSQL service]
DATABASE_PASSWORD=[from Railway PostgreSQL service]

# CORS - Add your Railway frontend domain
CORS_ALLOWED_ORIGINS=https://[your-frontend-domain].railway.app,http://localhost:3000

# JWT Secret - GENERATE A NEW ONE FOR PRODUCTION!
# Generate with: openssl rand -base64 64
JWT_SECRET=[paste generated secret here]

# Optional
JWT_EXPIRATION_MS=86400000
DDL_AUTO=update
SPRING_PROFILES_ACTIVE=prod
```

### 5. Configure Frontend Environment Variables

Go to Frontend service → Variables tab and add:

```bash
# Backend API - Use your Railway backend domain
NEXT_PUBLIC_BACKEND_API=https://[your-backend-domain].railway.app/api

# NextAuth Secret - GENERATE A NEW ONE!
# Generate with: openssl rand -base64 32
AUTH_SECRET=[paste generated secret here]

# Google OAuth (if using)
AUTH_GOOGLE_ID=[your Google client ID]
AUTH_GOOGLE_SECRET=[your Google client secret]

# Auth URL - Use your Railway frontend domain
NEXTAUTH_URL=https://[your-frontend-domain].railway.app
```

### 6. Update Google OAuth Redirect URIs

If using Google OAuth, add these to your Google Cloud Console:

**Authorized redirect URIs:**
```
https://[your-frontend-domain].railway.app/api/auth/callback/google
```

**Authorized JavaScript origins:**
```
https://[your-frontend-domain].railway.app
```

### 7. Deploy & Monitor

Railway will automatically deploy on push. Monitor deployment:
- Check "Deployments" tab for build logs
- Check "Logs" tab for runtime logs
- Click "Open" to test your deployment

---

## 🔒 Security Checklist

- [ ] JWT_SECRET changed from default
- [ ] AUTH_SECRET changed from default
- [ ] DATABASE_PASSWORD is strong (Railway auto-generates)
- [ ] CORS_ALLOWED_ORIGINS limited to your domains (no wildcards)
- [ ] Google OAuth credentials are for production app

---

## 🧪 Testing After Deployment

1. **Backend Health Check:**
   ```bash
   curl https://[your-backend-domain].railway.app/hello
   # Should return: "hello world!"
   ```

2. **Frontend:**
   - Visit: `https://[your-frontend-domain].railway.app`
   - Try login with Google OAuth
   - Try registration with email/password
   - Create a review (test JWT authentication)

3. **Database:**
   - Reviews should persist
   - Check Railway PostgreSQL logs for connections

---

## 🐛 Troubleshooting

### Backend won't start
- Check Railway logs for errors
- Verify DATABASE_URL format matches Spring Boot requirements
- Ensure JWT_SECRET is set

### Frontend can't reach backend
- Verify NEXT_PUBLIC_BACKEND_API is correct
- Check CORS_ALLOWED_ORIGINS includes frontend domain
- Test backend endpoint directly: `/api/hello`

### Authentication failing
- Verify AUTH_SECRET is set
- Check Google OAuth redirect URIs match Railway domain
- Ensure JWT_SECRET matches between backend restarts

### CORS errors
- Add frontend domain to CORS_ALLOWED_ORIGINS
- Format: `https://domain1.railway.app,https://domain2.railway.app`
- Don't forget trailing domains (no trailing slash)

---

## 📊 Monitoring

**Railway provides:**
- Deployment logs (build process)
- Runtime logs (application logs)
- Metrics (CPU, memory, network)
- Database metrics

**Check logs for:**
- Spring Boot startup messages
- JWT token validation logs
- Database connection confirmations
- API request logs

---

## 🔄 Updating Deployment

1. Make code changes locally
2. Commit changes
3. Push to GitHub: `git push origin main`
4. Railway auto-deploys (watch "Deployments" tab)

---

## 💰 Cost Estimation (Railway Free Tier)

- **Starter Plan**: $5/month included usage
- **PostgreSQL**: ~$2/month
- **Backend (Spring Boot)**: ~$3-5/month depending on traffic
- **Frontend (Next.js)**: ~$3-5/month depending on traffic

Total: ~$8-12/month for low traffic

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Realista GitHub: https://github.com/s-counago/realista
