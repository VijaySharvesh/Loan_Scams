import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import { connectDB } from './config/db';

import userRoutes from './routes/userRoutes';
import lenderRoutes from './routes/lenderRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();
const app = express();

// Enable CORS for all origins (Adjust as needed)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/lenders', lenderRoutes);
app.use('/api/reports', reportRoutes);

connectDB().then(() => {
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
});
