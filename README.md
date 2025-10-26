# WingerFoods - Full-Stack Food Delivery App

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18.2-black?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.4-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-blue?logo=stripe&logoColor=white)](https://stripe.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://wingerfoods-frontend.onrender.com/)

WingerFoods is a full-stack e-commerce food delivery application built with the **MERN stack** (MongoDB, Express, React, Node.js) and integrated with **Stripe** for payments. Users can browse food items, add to cart, place orders, and admins can manage products via a protected panel.

---

## Key Features

- **Full E-Commerce Flow:** Browse, add/remove items from cart, and place orders.  
- **User Authentication:** Secure registration and login using JWT.  
- **Payment Integration:** Stripe Checkout for real-time payments.  
- **Order Management:** Users can view their order history.  
- **Admin Panel:** Add/remove food items with image uploads.  
- **Responsive Frontend:** React, React Router, and Context API for smooth UX.

---

## Technologies Used

### Frontend
- **React**  
- **React Router (`react-router-dom`)**  
- **React Context API** (Global state management)  
- **Axios** (API requests)  
- **CSS** (Custom styling)  

### Backend
- **Node.js & Express.js** (RESTful API)  
- **MongoDB with Mongoose** (Database for users, food items, and orders)  
- **JWT** (Authorization & route protection)  
- **Stripe** (Payment processing)  
- **Multer** (Image upload handling)  
- **CORS** (Enable cross-origin requests)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/)  
- [npm](https://www.npmjs.com/)  
- [MongoDB](https://www.mongodb.com/try/download/community) or MongoDB Atlas account

### Installation & Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Mudassar123khan/WingerFoods
    cd WingerFoods
    ```
2.  **Set up the Backend:**
    ```sh
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the /backend folder
    # Add your environment variables
    touch .env
    ```
    Your `backend/.env` file should look like this:
    ```env
    PORT=4000
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    STRIPE_SECRET_KEY=your_stripe_sk_test_key
    ```

    * `PORT`: The port your backend server will run on (e.g., 4000).
    * `MONGO_URL`: Your connection string for your local or cloud MongoDB database.
    * `JWT_SECRET`: A strong, random string used to sign your tokens.
    * `STRIPE_SECRET_KEY`: Your secret key from the Stripe dashboard.

    ```sh
    # Start the backend server
    npm run server
    ```
    Your server should now be running on `http://localhost:4000`.

3.  **Set up the Frontend:**
    ```sh
    # Navigate to the frontend folder
    cd ../frontend

    # Install dependencies
    npm install

    # Start the frontend development server
    npm run dev
    ```
    Your React app should now be running on `http://localhost:5173` (or 3000).

## API Routes

### Food Routes
* `POST /api/food/add`: (Admin) Adds a new food item to the database.
* `GET /api/food/list`: Gets all food items.
* `POST /api/food/remove`: (Admin) Removes a food item.

### User Routes
* `POST /api/user/register`: Creates a new user.
* `POST /api/user/login`: Logs in a user and returns a token.

### Cart Routes (Protected)
* `POST /api/cart/add`: Adds an item to the user's cart.
* `POST /api/cart/remove`: Removes an item from the user's cart.
* `POST /api/cart/get`: Gets the user's current cart.

### Order Routes
* `POST /api/order/place`: Creates a new order and proceeds to Stripe checkout.
* `POST /api/order/verify`: Verifies a Stripe payment.
* `POST /api/order/userorders`: (Protected) Gets all orders for the logged-in user.

 # Live Demo

Check out the deployed website here: https://wingerfoods-frontend.onrender.com

# License

This project is licensed under the MIT License.
