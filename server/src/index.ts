import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/authRoutes';
import recipeRoutes from './routes/recipeRoutes';
import eventRoutes from './routes/eventRoutes';
import mealPlanRoutes from './routes/mealPlanRoutes';
import shoppingListRoutes from './routes/shoppingListRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/shopping-list', shoppingListRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
