// models/User.js
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  pincode: String,
  tag: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false }); // Optional: avoid generating _id for each address entry

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: /^[6-9]\d{9}$/
  },
  role: {
    type: String,
    enum: ['user'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  address: [addressSchema], // Cleanly separated
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
