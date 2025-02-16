import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../lib/auth';
import connectDB from '../lib/mongodb';

export async function login(req: Request, res: Response) {
  try {
    await connectDB();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    await connectDB();
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the first user as admin
    const isFirstUser = (await User.countDocuments({})) === 0;
    
    user = new User({
      email,
      password,
      role: isFirstUser ? 'admin' : 'user',
    });

    await user.save();

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}