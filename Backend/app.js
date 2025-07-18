import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './models/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routs.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
connectDB()
app.get('/', (req, res) => {
    res.send('Hello duniyaa');
});
export default app;

