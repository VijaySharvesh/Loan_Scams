import mongoose from 'mongoose';
import connectDB from './mongodb';

export async function getCollection(collectionName: string) {
  await connectDB();
  return mongoose.connection.collection(collectionName);
}

export async function closeConnection() {
  await mongoose.connection.close();
}