# Environment Setup Guide

## Backend Environment Variables

### Create `.env` file

File location: `Charansparsh_backend/.env`

```env
# ─── MongoDB (Required) ───
MONGODB_URL=mongodb://127.0.0.1:27017
# For MongoDB Atlas: mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net

# ─── JWT Tokens (Required) ───
ACCESS_TOKEN_SECRET=your_random_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_random_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=10d

# ─── Server (Optional - defaults shown) ───
PORT=8000
CORS_ORIGIN=*
NODE_ENV=development

# ─── Cloudinary (Required for image uploads) ───
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ─── Razorpay (Required for payments) ───
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Variable Details

| Variable | Mandatory | Default | Purpose |
|---|---|---|---|
| `MONGODB_URL` | Yes | - | MongoDB connection string (without database name - `charansparshdatabase` is auto-appended) |
| `ACCESS_TOKEN_SECRET` | Yes | - | JWT signing secret for access tokens |
| `ACCESS_TOKEN_EXPIRY` | Yes | - | Access token lifespan (e.g., `1d`, `1h`) |
| `REFRESH_TOKEN_SECRET` | Yes | - | JWT signing secret for refresh tokens |
| `REFRESH_TOKEN_EXPIRY` | Yes | - | Refresh token lifespan (e.g., `10d`) |
| `PORT` | No | `8000` | Backend server port |
| `CORS_ORIGIN` | No | `*` | Allowed CORS origin (use `*` in dev, frontend URL in prod) |
| `NODE_ENV` | No | `development` | Environment mode |
| `CLOUDINARY_CLOUD_NAME` | Yes* | - | Required if using image upload |
| `CLOUDINARY_API_KEY` | Yes* | - | Required if using image upload |
| `CLOUDINARY_API_SECRET` | Yes* | - | Required if using image upload |
| `RAZORPAY_KEY_ID` | Yes* | - | Required if using payments |
| `RAZORPAY_KEY_SECRET` | Yes* | - | Required if using payments |

*\* Marked as "Yes*" = required for that feature to work, but app can start without them*

## Frontend Environment Variables

Currently, all frontends use **hardcoded API URLs** in config files. No environment variables are needed to run them in development.

| Frontend | Config File | Current API URL |
|---|---|---|
| User Panel | `Charansparsh_user/src/Config.js` | `https://backend.enewbharat.in` |
| Admin Panel | `charansparsh_admin/src/config.js` | `https://backend.enewbharat.in` |
| Vendor Panel | `charansparsh_vendor/src/config.js` | `https://backend.enewbharat.in` |

To change the API URL, edit the `Baseurl` variable in each `config.js` file.

> **Note:** The `.env` file is already created at `Charansparsh_backend/.env` with development-safe defaults. JWT secrets are pre-populated with working values. Cloudinary and Razorpay keys need to be added for full functionality.

## Quick Start

```bash
# 1. Ensure MongoDB is running locally
mongod

# 2. Start backend
cd Charansparsh_backend
npm install   # already done
npm run dev   # starts on port 8000

# 3. Start frontends (separate terminals)
cd Charansparsh_user && npm run dev
cd charansparsh_admin && npm start
cd charansparsh_vendor && npm start
```
