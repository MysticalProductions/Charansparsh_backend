# Missing Requirements & Blockers

## Critical Blockers

### 1. MongoDB Not Running Locally
**Status:** ❌ Blocked
**Issue:** MongoDB is not installed or running on the local machine. The backend will crash at startup trying to connect.
**Fix:**
```bash
# Option A: Install MongoDB locally
brew install mongodb-community
brew services start mongodb-community

# Option B: Use Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Option C: Use MongoDB Atlas (free tier)
# Set MONGODB_URL to your Atlas connection string in .env
```

### 2. Cloudinary Credentials Missing
**Status:** ⚠️ Partial Block
**Issue:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are not set in `.env`.
**Impact:** Image uploads will fail. App can start but file upload features will not work.
**Fix:** Create a free account at https://cloudinary.com and add credentials to `.env`.

### 3. Razorpay Credentials Missing
**Status:** ⚠️ Partial Block
**Issue:** `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are not set in `.env`.
**Impact:** Payment processing will fail. App can start but checkout will not work.
**Fix:** Create a free account at https://razorpay.com and add API keys to `.env`.

---

## Non-Critical Issues

### 4. Hardcoded API URLs in Frontends
**Status:** ⚠️ Warning
**File:** `Charansparsh_user/src/Config.js`, `charansparsh_admin/src/config.js`, `charansparsh_vendor/src/config.js`
**Issue:** All frontends have `Baseurl = "https://backend.enewbharat.in"` hardcoded.
**Impact:** Frontends connect to a production backend URL rather than localhost during development.
**Fix (for local dev):** Change to `http://localhost:8000` in each config file.
**Fix (for production):** Update to your deployed backend URL.

### 5. Import Errors in Review Module
**Status:** ✅ Fixed
**File:** `src/Modules/Review/Review.model.js`, `Review.controler.js`, `Review.routes.js`
**Issue:** Missing `import mongoose` and wrong case in import paths. These have been auto-fixed.

### 6. Import Errors in Transaction Module
**Status:** ✅ Fixed
**File:** `src/Modules/Transactions/Transaction.controler.js`, `Transaction.routes.js`
**Issue:** Wrong case in import paths. These have been auto-fixed.

### 7. Hardcoded Email Credentials
**Status:** ⚠️ Warning
**File:** `src/utils/SendEmail.js`
**Issue:** Email credentials are hardcoded (`cthdotcom@gmail.com` / app password).
**Impact:** Will stop working if Gmail password is changed or if Google blocks the app.
**Recommendation:** Move to env variables.

### 8. Hardcoded Admin Credentials
**Status:** ⚠️ Warning
**File:** `src/Modules/Admin/Admin.controler.js` (`initializeAdmin`)
**Issue:** Default admin created with username `admin` and password `admin@1234`.
**Impact:** Security risk if deployed without changing password.
**Recommendation:** Change password immediately after first login.

### 9. Deprecated Module Directories
**Status:** ℹ️ Info
**Issue:** `src/Modules/Order/` and `src/Modules/Vendor/` contain fully commented-out code (legacy).
**Impact:** No functional impact. Active versions are in `NewOrder/` and `NewVendor/`.

### 10. Missing Routes for Some Modules
**Status:** ℹ️ Info
**Files:** `Review/`, `Transactions/`, `Searching/`, `WithdrawalRequest/`
**Issue:** These modules exist but their routes are not imported in `app.js`.
**Impact:** These API endpoints are not accessible. May be intentional (WIP or admin-only features).

### 11. No Input Validation/Sanitization
**Status:** ℹ️ Info
**Issue:** Most controllers lack input sanitization beyond basic `if (!x)` checks.
**Impact:** Low risk for development. Consider `express-validator` for production hardening.

---

## Summary

| Priority | Issue | Status | Effort to Fix |
|---|---|---|---|
| 🔴 Critical | MongoDB not running | ❌ Blocked | 5 min |
| 🟡 High | Cloudinary credentials | ⚠️ Needs user input | 5 min |
| 🟡 High | Razorpay credentials | ⚠️ Needs user input | 5 min |
| 🟢 Low | Hardcoded API URLs | ⚠️ Manual change | 2 min |
| ✅ Done | Review module import errors | ✅ Fixed | - |
| ✅ Done | Transaction module import errors | ✅ Fixed | - |
| 🟢 Low | Hardcoded email creds | ⚠️ Optional refactor | 10 min |
| 🟢 Low | Default admin password | ⚠️ Change on deploy | 1 min |
