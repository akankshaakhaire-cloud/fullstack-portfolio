# 📘 Cloth Inventory Management System - API Documentation

## 📌 Overview

This document describes all REST APIs available in the Cloth Inventory Management System. The backend is built using FastAPI and follows RESTful API standards with JWT Authentication.

---

# 🌐 Base URL

### Local

```
http://127.0.0.1:8000
```

### Production

```
https://fullstack-portfolio-1-q26k.onrender.com
```

---

# 🔐 Authentication

The application uses JWT (JSON Web Token) Authentication.

After successful login:

- JWT Access Token is generated.
- Token must be included in every protected API request.

Example:

```
Authorization: Bearer <your_access_token>
```

---

# 👤 Authentication APIs

## Register User

| Method | Endpoint |
|----------|----------------|
| POST | /users/register |

### Request Body

```json
{
    "name":"Admin",
    "email":"admin@example.com",
    "password":"admin123",
    "role":"admin"
}
```

---

## Login

| Method | Endpoint |
|----------|----------------|
| POST | /users/login |

### Request

```json
{
    "email":"admin@example.com",
    "password":"admin123"
}
```

### Response

```json
{
    "access_token":"JWT_TOKEN",
    "token_type":"bearer"
}
```

---

# 📦 Product APIs

## Get All Products

| Method | Endpoint |
|----------|----------------|
| GET | /products |

---

## Get Product By ID

| Method | Endpoint |
|----------|----------------|
| GET | /products/{id} |

---

## Add Product

| Method | Endpoint |
|----------|----------------|
| POST | /products |

---

## Update Product

| Method | Endpoint |
|----------|----------------|
| PUT | /products/{id} |

---

## Delete Product

| Method | Endpoint |
|----------|----------------|
| DELETE | /products/{id} |

---

# 📊 Dashboard APIs

## Dashboard Summary

| Method | Endpoint |
|----------|----------------|
| GET | /dashboard |

Returns:

- Total Products
- Low Stock
- Inventory Value
- Recent Activity

---

# 🔍 Search & Filter

Supports:

- Product Name
- Category
- Brand
- Size
- Pagination

---

# 🖼 Image Upload

Supports Product Image Upload.

Accepted formats

- JPG
- PNG
- JPEG

---

# ❌ HTTP Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|404|Not Found|
|422|Validation Error|
|500|Internal Server Error|

---

# 🛠 Technologies

- FastAPI
- Python
- PostgreSQL
- SQLAlchemy
- JWT Authentication
- React
- TypeScript
- Axios

---

# 📖 API Testing

The APIs can be tested using:

- Swagger UI
- Postman
- Insomnia

Swagger URL

```
/docs
```

Redoc URL

```
/redoc
```

---

# ✅ Conclusion

The API is designed following REST principles and includes secure authentication, CRUD operations, dashboard analytics, search, filtering, image upload, and pagination for efficient inventory management.