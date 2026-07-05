# Deployment Guide: Charansparsh

## Architecture Overview

```
                    ┌─────────────────────────────────┐
                    │     MongoDB Atlas (Database)      │
                    └────────────────┬────────────────┘
                                     │ MONGODB_URL
                    ┌────────────────▼────────────────┐
                    │   Backend - Render/Railway       │
                    │   (Express.js on Port 8000)      │
                    └──┬──────────────┬───────────────┘
                       │              │
            ┌──────────▼───┐    ┌─────▼──────────┐
            │  Vercel      │    │  Vercel         │
            │  User Panel  │    │  Admin Panel    │
            └──────────────┘    └────────────────┘
                       │
                 ┌─────▼──────────┐
                 │  Vercel         │
                 │  Vendor Panel   │
                 └────────────────┘
```

---

## 1. Database → MongoDB Atlas

### Setup

```bash
# 1. Create free cluster at https://cloud.mongodb.com
# 2. Create database user (username + password)
# 3. Whitelist IP: 0.0.0.0/0 (allow all - for production)
# 4. Get connection string:
#    mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net
```

### Connection String Format
```
MONGODB_URL=mongodb+srv://charansparsh:<password>@cluster0.xxxxx.mongodb.net
```

> The database name `charansparshdatabase` is auto-appended by the backend code.

### Production Checklist
- [ ] Create MongoDB Atlas cluster
- [ ] Create database user with read/write permissions
- [ ] Whitelist deployment IP addresses
- [ ] Test connection string locally first

---

## 2. Backend → Render

### Steps

1. Push backend code to GitHub repository
2. Go to https://dashboard.render.com → New + → Web Service
3. Connect your GitHub repository
4. Configure:

```yaml
# Render Dashboard Settings
Name: charansparsh-api
Root Directory: Charansparsh_backend
Runtime: Node
Build Command: npm install
Start Command: node src/index.js
```

### Environment Variables (Render Dashboard)

| Key | Value |
|---|---|
| `MONGODB_URL` | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net` |
| `ACCESS_TOKEN_SECRET` | `<random-64-char-string>` |
| `ACCESS_TOKEN_EXPIRY` | `1d` |
| `REFRESH_TOKEN_SECRET` | `<random-64-char-string>` |
| `REFRESH_TOKEN_EXPIRY` | `10d` |
| `PORT` | `8000` |
| `CORS_ORIGIN` | `https://charansparsh-user.vercel.app,https://charansparsh-admin.vercel.app,https://charansparsh-vendor.vercel.app` |
| `NODE_ENV` | `production` |
| `CLOUDINARY_CLOUD_NAME` | `<your-cloud-name>` |
| `CLOUDINARY_API_KEY` | `<your-api-key>` |
| `CLOUDINARY_API_SECRET` | `<your-api-secret>` |
| `RAZORPAY_KEY_ID` | `<your-razorpay-key>` |
| `RAZORPAY_KEY_SECRET` | `<your-razorpay-secret>` |

## Alternative: Backend → Railway

```bash
# Railway CLI
railway login
railway init
railway add -p mongodb  # Add MongoDB plugin
railway up
```

Railway auto-deploys from GitHub. Add same env variables in Railway dashboard.

---

## 3. Frontends → Vercel

For each frontend (`Charansparsh_user`, `charansparsh_admin`, `charansparsh_vendor`):

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy User Panel
cd Charansparsh_user
vercel --prod

# Deploy Admin Panel
cd charansparsh_admin
vercel --prod

# Deploy Vendor Panel
cd charansparsh_vendor
vercel --prod
```

### Or Using Vercel Dashboard

1. Push each frontend to separate GitHub repos (or subfolders)
2. Go to https://vercel.com → Add New Project
3. Import the repository
4. Configure:

#### User Panel (Vite)
```yaml
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

#### Admin Panel (CRA)
```yaml
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
```

#### Vendor Panel (CRA)
```yaml
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
```

### Update API URL for Production

After deploying the backend, update the `Baseurl` in each frontend's config file:

| Frontend | File | Change To |
|---|---|---|
| User | `src/Config.js` | `https://your-backend.onrender.com` |
| Admin | `src/config.js` | `https://your-backend.onrender.com` |
| Vendor | `src/config.js` | `https://your-backend.onrender.com` |

---

## 4. Cloudinary Setup

1. Create account at https://cloudinary.com
2. Get credentials from Dashboard
3. Add to backend env:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## 5. Razorpay Setup

1. Create account at https://razorpay.com
2. Get API keys from Settings → API Keys
3. Add to backend env:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
   ```
4. Add webhook URL in Razorpay Dashboard:
   ```
   https://your-backend.onrender.com/api/v1/payments/verify
   ```

---

## Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created and accessible
- [ ] Render/Railway service configured
- [ ] All environment variables set
- [ ] Health endpoint accessible: `GET /health`
- [ ] CORS configured with frontend URLs
- [ ] Logs monitored for startup errors

### Frontends
- [ ] API URL updated to production backend
- [ ] Vercel project configured with correct framework
- [ ] Build succeeds on Vercel
- [ ] Environment variables set (if any)

### Post-Deployment
- [ ] Test user registration and login
- [ ] Test admin login (default: admin / admin@1234)
- [ ] Test product creation
- [ ] Test checkout flow with Razorpay
- [ ] Test file uploads with Cloudinary
- [ ] Verify email sending works (update SendEmail.js if needed)
