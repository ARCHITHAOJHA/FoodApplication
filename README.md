# FoodApplication
# 🍔 Food Delivery Application

A full-stack **Food Delivery Web Application** built using **React (Frontend)** and **Spring Boot (Backend)**. The platform connects **Customers**, **Restaurant Owners**, and **Admins** into a single ecosystem for seamless food ordering and management.

---

## 🚀 Project Overview

This application enables users to browse restaurants, place food orders, and manage operations efficiently. It supports three main roles:

* 👤 **Customer**
* 🏪 **Restaurant Owner**
* 🛠️ **Admin**

Each role has dedicated functionalities to ensure a smooth and scalable system.

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Axios
* React Router
* Bootstrap / Tailwind CSS (optional)

### Backend

* Spring Boot
* Spring Security (JWT Authentication)
* Hibernate / JPA
* REST APIs

### Database

* MySQL / PostgreSQL

---

## ✨ Features

### 👤 Customer

* User Registration & Login
* Browse Restaurants & Menus
* Add Items to Cart
* Place Orders
* Track Order Status
* View Order History

### 🏪 Restaurant Owner

* Restaurant Registration & Login
* Manage Menu (Add/Edit/Delete Items)
* View Incoming Orders
* Update Order Status (Preparing, Delivered, etc.)
* Manage Restaurant Details

### 🛠️ Admin

* Manage Users (Customers & Owners)
* Approve / Reject Restaurants
* Monitor Orders
* Dashboard Analytics (optional)

---

## 📂 Project Structure

```
Food-Delivery-App/
│
├── frontend/                 # React Application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                 # Spring Boot Application
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/food-delivery-app.git
cd food-delivery-app
```

---

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend
```

#### Configure Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/food_delivery
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

#### Run Backend

```bash
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🔐 Authentication

* JWT-based authentication is used
* Role-based access:

  * CUSTOMER
  * RESTAURANT_OWNER
  * ADMIN

---

## 📡 API Endpoints (Sample)

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Register user       |
| POST   | /auth/login    | Login user          |
| GET    | /restaurants   | Get all restaurants |
| POST   | /orders        | Place order         |
| GET    | /admin/users   | Get all users       |

---

## 📸 Screens (Optional to Add)

* Login / Signup Page
* Customer Dashboard
* Restaurant Owner Panel
* Admin Dashboard

---

## 🌟 Future Enhancements

* 💳 Online Payment Integration (Razorpay/Stripe)
* 📍 Real-time Order Tracking (Maps API)
* 🔔 Notifications (Email/SMS)
* 📊 Advanced Analytics Dashboard
* 📱 Mobile App Version

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by *Architha Ojha*

##

---

⭐ If you like this project, consider giving it a star!
