import express from 'express';
import { signup, login } from '../controllers/User.Controller.js';
import { verifyToken } from '../middlewares/auth.js';
import { updateProfile } from '../controllers/User.Controller.js'; // Import the new controller

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.put("/profile", verifyToken, updateProfile); // PUT /api/user/profile

export default router;
