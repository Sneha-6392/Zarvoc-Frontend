// Backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Database connection
import connectDB from './models/db.js';

// Mongoose Models (Ensure these paths are correct relative to app.js)
import UserInfo from './models/UserInfo.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

// Import your existing routes
import userRoutes from './routes/user.routs.js';
import productRoutes from './routes/product.routes.js';
import sellerRoutes from './routes/Seller.routes.js';
import googleRoutes from './routes/google.routes.js';
import cartRoutes from "./routes/Cart.routes.js"; // Your existing cart routes

// Import the new routes for checkout
import userInfoRoutes from './routes/userinfo.routes.js'; // New user info routes
import orderRoutes from './routes/order.routes.js';       // New order routes


dotenv.config(); // Load environment variables
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors());         // Enable Cross-Origin Resource Sharing

// Use your existing routes
app.use('/api/users', userRoutes);
app.use('/api', productRoutes); // Consider more specific prefix for product routes if needed
app.use("/api/sellers", sellerRoutes);
app.use("/api/auth", googleRoutes);
app.use("/api/cart", cartRoutes); // Your existing cart API routes

// Use the new routes for checkout/address/orders
app.use('/api/userinfo', userInfoRoutes); // Handles POST/GET for user address
app.use('/api/orders', orderRoutes);     // Handles POST for placing orders

// Connect to the database
connectDB();

// Basic root route for testing
app.get('/', (req, res) => {
    res.send('Hello from Zarvoc Backend!');
});

export default app;