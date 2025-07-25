import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Add this
import express from 'express'; // ✅ Needed if not inside `app.js`
import app from './app.js'; // assume this sets up express()
import razorpayRoutes from './routes/razorpay.js';
import userRoutes from './routes/users.js'; // ✅ ADD THIS

dotenv.config();

app.use(cors({
  origin: 'https://urbantales-five.vercel.app', // ✅ your frontend
  credentials: true,
}));

// ✅ Required to parse JSON body
app.use(express.json()); // if not already inside app.js

// ✅ Mount routes
app.use('/api/razorpay', razorpayRoutes);
app.use('/api/users', userRoutes); // ✅ Add this line

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
