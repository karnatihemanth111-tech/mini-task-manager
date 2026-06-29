import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route — useful to test if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running' });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// Connect MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Stop server if DB fails
  });