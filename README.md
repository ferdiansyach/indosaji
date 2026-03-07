# Indosaji - Premium Food Delivery Platform 🍛🛵

![Indosaji UI](frontend/public/header_img.png)

Indosaji is a full-stack premium food delivery web application focusing on authentic Indonesian cuisine. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and Vite, it features a sleek modern dark theme, Stripe payment integration, and a comprehensive Admin Dashboard for restaurant management.

## 🌟 Key Features

### 🛒 Frontend (Customer App)
- **Premium UI/UX:** A stunning dark navy theme with amber/gold accents, featuring glassmorphism and subtle animations.
- **Dynamic Menu:** Browse 40+ authentic Indonesian dishes categorized into Salads, Rolls, Desserts, Sandwiches, Cakes, Pure Veg, Pasta, and Noodles. 
- **Cart & Checkout:** Add items to cart, calculate delivery fees, and securely checkout using **Stripe**.
- **Order Tracking:** Track the status of active and past orders from the user dashboard.
- **Authentication:** Secure user login and registration using JWT.

### 💼 Admin Panel
- **Financial Dashboard:** A complete financial overview displaying Total Revenue, Total Orders, Estimated Profit, and Delivered Orders.
- **Order Management:** View recent orders, track payment statuses (Paid/Pending), and update delivery status (Processing, Out for Delivery, Delivered).
- **Menu Management:** Add, list, and remove food items from the database with integrated image uploading.

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite, Context API, Vanilla CSS (Custom Design System)
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB (Mongoose)
- **Payments:** Stripe API (IDR support)
- **Tooling:** Concurrently (single-command dev environment startup)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v20+ recommended) and a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account. You will also need a [Stripe](https://stripe.com/) account for payments.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/indosaji.git
   cd indosaji
   ```

2. Install dependencies for all directories in a single command:
   ```bash
   npm run install-all
   ```

3. Set up Environment Variables. You will need a `.env` file in the `backend` folder:
   ```env
   # backend/.env 
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

### Running the Application (One Command)

To start the backend, frontend, and admin panel simultaneously, run:
```bash
npm run dev
```

The applications will be running at:
- **Frontend:** `http://localhost:5173`
- **Admin Panel:** `http://localhost:5174`
- **Backend API:** `http://localhost:4000`

---
*Created with ❤️ for Indonesian cuisine lovers.*
