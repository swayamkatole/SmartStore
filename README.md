# 🛒 SmartStore — Full Stack E-Commerce Application

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🎨 Frontend | [smart-store-green.vercel.app](https://smart-store-green.vercel.app) |
| ⚙️ Backend API | [smartstore-backend-chg3.onrender.com](https://smartstore-backend-chg3.onrender.com) |

> ⚠️ Backend is on Render free tier — may take 30–60 seconds to wake up on first visit.

---

## 📌 About

SmartStore is a production-grade full-stack e-commerce web application built completely from scratch. It features JWT authentication, product catalog with search and filtering, shopping cart with GST calculation, order management, and Redis caching for performance.

---

## 🚀 Tech Stack

### Frontend
| Tech | Use |
|------|-----|
| React 18 + Vite | UI and build tool |
| React Router v6 | Page navigation |
| Axios | API calls |
| Tailwind CSS | Styling |
| Context API | Auth and Cart state |

### Backend
| Tech | Use |
|------|-----|
| Spring Boot 3.2 | REST API |
| Java 21 | Core language |
| Spring Security + JWT | Authentication |
| Spring Data JPA | Database ORM |
| H2 Database | In-memory DB |
| Redis | Product caching |
| Docker | Containerization |

### Deployment
| Platform | Purpose |
|----------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| GitHub | Version control |

---

## ✨ Features

- 🔐 **JWT Authentication** — Register, Login, Logout
- 🛍️ **Product Catalog** — 16 products, 5 categories, search and filter
- 🛒 **Shopping Cart** — Add, remove, update qty, persists on refresh
- 💰 **GST Calculation** — 18% tax, free shipping above Rs.499
- 📦 **Order Management** — Place orders, view history with status
- ⚡ **Redis Caching** — Faster product API responses
- 🔒 **Role Based Access** — ADMIN manages products, USER shops
- 📱 **Responsive UI** — Works on mobile and desktop

---

## 🏗️ Architecture

```mermaid
graph TD
    A[User Browser] -->|HTTP Request| B[React Frontend - Vercel]
    B -->|REST API + JWT| C[Spring Boot Backend - Render]
    C -->|JPA Queries| D[(H2 / MySQL Database)]
    C -->|Cache Read/Write| E[(Redis Cache)]
    C -->|Validate Token| F[JWT Security Filter]
    style A fill:#4ade80,color:#000
    style B fill:#60a5fa,color:#000
    style C fill:#f97316,color:#000
    style D fill:#a78bfa,color:#000
    style E fill:#f43f5e,color:#fff
    style F fill:#fbbf24,color:#000
```n
---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login and get JWT |
| GET | /api/products | All products cached |
| GET | /api/products/{id} | Single product |
| GET | /api/products/search | Search by name |
| POST | /api/products | Create ADMIN only |
| PUT | /api/products/{id} | Update ADMIN only |
| DELETE | /api/products/{id} | Delete ADMIN only |
| POST | /api/orders | Place order |
| GET | /api/orders/user/{id} | Order history |

---

## 💻 Run Locally

```bash
git clone https://github.com/swayamkatole/SmartStore.git
cd SmartStore

# Backend
cd Backend
./mvnw spring-boot:run

# Frontend - open new terminal
cd frontend
npm install
npm run dev
```n
### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartstore.com | admin123 |
| User | user@smartstore.com | user123 |

---

## 📁 Project Structure

```n SmartStore/
 ├── Backend/
 │   ├── controller/
 │   │   ├── AuthController.java
 │   │   ├── ProductController.java
 │   │   └── OrderController.java
 │   ├── model/
 │   │   ├── User.java
 │   │   ├── Product.java
 │   │   ├── Order.java
 │   │   └── Category.java
 │   ├── security/
 │   │   ├── JwtUtil.java
 │   │   └── JwtFilter.java
 │   ├── SecurityConfig.java
 │   ├── DataInitializer.java
 │   ├── Dockerfile
 │   └── pom.xml
 └── frontend/
     └── src/
         ├── pages/
         │   ├── HomePage.jsx
         │   ├── LoginPage.jsx
         │   ├── RegisterPage.jsx
         │   ├── ProductDetailPage.jsx
         │   ├── CartPage.jsx
         │   └── OrdersPage.jsx
         ├── components/
         │   ├── Navbar.jsx
         │   └── ProductCard.jsx
         ├── context/
         │   ├── AuthContext.jsx
         │   └── CartContext.jsx
         ├── services/
         │   └── api.js
         └── App.jsx
```n
---

## 🎯 Key Technical Decisions

| Decision | Reason |
|----------|--------|
| JWT over Sessions | Stateless auth scales better |
| Context API over Redux | Sufficient for this scale |
| H2 for dev | Zero setup, MySQL-compatible schema |
| Docker on Render | Render has no Java support natively |
| Redis caching | Reduces DB load on product endpoints |

---

## 👨‍💻 Author

**Swayam Katole**
- GitHub: [@swayamkatole](https://github.com/swayamkatole)
- Live: [smart-store-green.vercel.app](https://smart-store-green.vercel.app)

---

⭐ Star this repo if you found it useful!