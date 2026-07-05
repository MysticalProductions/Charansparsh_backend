# Project Analysis: Charansparsh

## Overview

**Project Name:** Charansparsh
**Type:** E-commerce Platform (Spiritual/Temple Products)
**Architecture:** Monorepo with 1 backend + 3 frontends

---

## Project Structure

```
Charansparsh/
├── Charansparsh_backend/       # Express.js API server
├── Charansparsh_user/          # User-facing website (Vite + React)
├── charansparsh_admin/         # Admin panel (Create React App)
└── charansparsh_vendor/        # Vendor panel (Create React App)
```

---

## Backend Analysis

| Property | Value |
|---|---|
| **Framework** | Express.js 4.19 |
| **Language** | JavaScript (ES Modules) |
| **Database** | MongoDB (Mongoose 8.4) |
| **Auth** | JWT (jsonwebtoken) with access + refresh tokens |
| **File Upload** | Multer → Cloudinary |
| **Payments** | Razorpay |
| **Email** | Nodemailer (Gmail SMTP) |
| **Port** | 8000 (default) |
| **Entry** | `src/index.js` |

### Models (MongoDB Collections)

| Collection | Module | Key Fields |
|---|---|---|
| `admins` | Admin | email, username, password, profilePhoto |
| `users` | User | fullName, email, password, mobile, address |
| `vendors` | NewVendor | sellerLegalName, gstNumber, panNumber, accountNumber, storeName |
| `products` | Product | title, description, price, stocks, category, subcategory, vendor |
| `categories` | Category | categoriesTitle, description, image, status |
| `subcategories` | SubCategory | subCategoryTitle, link, image, category (ref) |
| `orders` | NewOrder | customer, vendor, products, totalAmount, status |
| `carts` | Cart | user, items (product refs), total, status |
| `payments` | Payment | order, user, razorpayOrderId, amount, status |
| `coupons` | Coupon | title, code, discount, status |
| `deliverycharges` | Delivery | Title, Price, Status |
| `taxes` | Tax | taxTitle, taxPercentage, status |
| `banners` | Banner | image, title, details, link |
| `sliders` | Slider | sliderImage, title, details, link |
| `blogs` | Blog | title, content, author, thumbnail |
| `faqs` | FAQ | question, answer |
| `testimonials` | Testimonial | name, message, rating |
| `states` | State | State, status |
| `employee` | Employee | name, email, mobileNumber, password, employeeRole |
| `employeeroles` | EmployeeRole | roleName, menuPermission |
| `notifications` | Notification | Type, Title, Detail |
| `useraddresses` | UserAddress | userId, fullName, phoneNumber, streetAddress |
| `wishlists` | Wishlist | userId, items |
| `addons` | Addon | name, price, status |
| `headercategories` | HeaderCategory | categoriesTitle, image, content, status |
| `transactions` | Transaction | customerEmail, transactionId, productId, vendorId |
| `reviews` | Review | customerName, rating, productName |
| `privacy_policies` | PrivacyPolicy | version, effectiveDate, sections |
| `terms_conditions` | termscondition | version, effectiveDate, sections |
| `return_policies` | ReturnPolicy | ReturnPolicy |
| `withdrawalrequests` | WithdrawalRequest | vendorId, amount, status |

### Auth Flow

1. **User**: Register → Login → JWT tokens → verifyJWT middleware
2. **Admin**: Auto-created on first startup (`admin@1234`) → Login → adminVerifyJWT
3. **Vendor**: Register → Login → vendorVerifyJWT

### API Routes

All routes prefixed with `/api/v1/`:
- `/api/v1/admin/*` - Admin auth & profile
- `/api/v1/user/*` - User auth & profile
- `/api/v1/Vendor/*` - Vendor auth & management
- `/api/v1/Product/*` - Products CRUD
- `/api/v1/category/*` - Categories
- `/api/v1/subcategory/*` - Subcategories
- `/api/v1/order/*` - Orders
- `/api/v1/cart/*` - Shopping cart
- `/api/v1/wishlist/*` - Wishlist
- `/api/v1/payments/*` - Razorpay payments
- `/api/v1/Banner/*` - Banners
- `/api/v1/slider/*` - Sliders
- `/api/v1/blog/*` - Blog posts
- `/api/v1/coupon/*` - Coupons
- `/api/v1/tax/*` - Tax settings
- `/api/v1/deliverycharg/*` - Delivery charges
- `/api/v1/adress/*` - User addresses
- `/api/v1/State/*` - States
- `/api/v1/faq/*` - FAQs
- `/api/v1/testimonial/*` - Testimonials
- `/api/v1/Returnpolicy/*` - Return policy
- `/api/v1/privacy/*` - Privacy policy
- `/api/v1/terms/*` - Terms & conditions
- `/api/v1/Employee/*` - Employee management
- `/api/v1/EmployeeRole/*` - Employee roles
- `/api/v1/Notification/*` - Notifications
- `/api/v1/Dashboard/*` - Dashboard stats
- `/api/v1/headercategory/*` - Header categories
- `/api/v1/addons/*` - Product addons
- `/health` - Health check

---

## Frontend Analysis

### User Panel (`Charansparsh_user`)
| Property | Value |
|---|---|
| **Framework** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS, Bootstrap 5, Material UI |
| **HTTP** | Axios + fetch |
| **Build** | `vite build` |
| **Dev** | `vite` (port 5173) |
| **API URL** | Hardcoded: `https://backend.enewbharat.in` |
| **Config File** | `src/Config.js` |

### Admin Panel (`charansparsh_admin`)
| Property | Value |
|---|---|
| **Framework** | React 18 + Create React App |
| **Styling** | Bootstrap 5 (CDN) |
| **HTTP** | Axios |
| **Build** | `react-scripts build` |
| **Dev** | `react-scripts start` (port 3000) |
| **API URL** | Hardcoded: `https://backend.enewbharat.in` |
| **Config File** | `src/config.js` |

### Vendor Panel (`charansparsh_vendor`)
| Property | Value |
|---|---|
| **Framework** | React 18 + Create React App |
| **Styling** | Bootstrap 5 (CDN) |
| **HTTP** | Axios |
| **Build** | `react-scripts build` |
| **Dev** | `react-scripts start` (port 3000) |
| **API URL** | Hardcoded: `https://backend.enewbharat.in` |
| **Config File** | `src/config.js` |

---

## Environment Variables Required

### Backend
| Variable | Status | Description |
|---|---|---|
| `MONGODB_URL` | Missing | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | Missing | JWT access token secret |
| `ACCESS_TOKEN_EXPIRY` | Missing | JWT access token expiry |
| `REFRESH_TOKEN_SECRET` | Missing | JWT refresh token secret |
| `REFRESH_TOKEN_EXPIRY` | Missing | JWT refresh token expiry |
| `PORT` | Missing (default 8000) | Server port |
| `CORS_ORIGIN` | Missing | Allowed CORS origins |
| `CLOUDINARY_CLOUD_NAME` | Missing | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Missing | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Missing | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | Missing | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Missing | Razorpay API key secret |

### Frontends
| Variable | Location | Status |
|---|---|---|
| `VITE_API_URL` | User panel | Not used (hardcoded) |
| `REACT_APP_API_URL` | Admin/Vendor | Not used (hardcoded) |
