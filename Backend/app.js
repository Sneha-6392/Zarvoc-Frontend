// app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './models/db.js';

import userRoutes from './routes/user.routs.js'; // ✅ Correct route
import productRoutes from './routes/product.routes.js';
import sellerRoutes from './routes/Seller.routes.js';
import googleRoutes from './routes/google.routes.js';
import cartRoutes from './routes/Cart.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://urbantales-five.vercel.app'],
  credentials: true,
}));

// ✅ Route mounts
app.use('/api/users', userRoutes);
app.use('/api', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/auth', googleRoutes);
app.use('/api/cart', cartRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello duniyaa');
});

export default app;
