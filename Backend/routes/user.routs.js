// routes/user.routs.js
import express from 'express';
import { signup, login, updateProfile } from '../controllers/User.Controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);           // ✅ /api/users/signup
router.post('/login', login);             // ✅ /api/users/login
router.put('/profile', verifyToken, updateProfile); // ✅ /api/users/profile

export default router;
