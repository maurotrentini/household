import express from 'express';
import MealPlan from '../models/MealPlan';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Get meal plan for a date range
// @route   GET /api/meal-plans
// @access  Private
router.get('/', protect, async (req: any, res) => {
    try {
        const { start, end } = req.query;
        const query: any = {};

        if (start && end) {
            query.date = { $gte: new Date(start), $lte: new Date(end) };
        }

        const meals = await MealPlan.find(query).populate('recipe');
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add a meal to the plan
// @route   POST /api/meal-plans
// @access  Private
router.post('/', protect, async (req: any, res) => {
    try {
        const { date, recipeId, mealType } = req.body;

        const mealPlan = new MealPlan({
            user: req.user._id,
            date,
            recipe: recipeId,
            mealType,
        });

        const createdMeal = await mealPlan.save();
        res.status(201).json(createdMeal);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// @desc    Remove a meal from the plan
// @route   DELETE /api/meal-plans/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const meal = await MealPlan.findById(req.params.id);

        if (meal) {
            await meal.deleteOne();
            res.json({ message: 'Meal removed' });
        } else {
            res.status(404).json({ message: 'Meal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
