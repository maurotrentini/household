import express from 'express';
import MealPlan from '../models/MealPlan';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Get shopping list for a date range
// @route   GET /api/shopping-list
// @access  Private
router.get('/', protect, async (req: any, res) => {
    try {
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({ message: 'Please provide start and end dates' });
        }

        // Find all meal plans in the range
        const meals = await MealPlan.find({
            user: req.user._id,
            date: { $gte: new Date(start), $lte: new Date(end) }
        }).populate('recipe');

        // Aggregate ingredients
        const ingredientsMap = new Map<string, { quantity: number, unit: string }>();

        meals.forEach((meal: any) => {
            if (meal.recipe && meal.recipe.ingredients) {
                meal.recipe.ingredients.forEach((ing: any) => {
                    const key = `${ing.name}-${ing.unit}`.toLowerCase();
                    const existing = ingredientsMap.get(key);

                    // Simple parsing of quantity (assuming it's a number-like string)
                    const qty = parseFloat(ing.quantity) || 0;

                    if (existing) {
                        ingredientsMap.set(key, {
                            quantity: existing.quantity + qty,
                            unit: ing.unit
                        });
                    } else {
                        ingredientsMap.set(key, {
                            quantity: qty,
                            unit: ing.unit
                        });
                    }
                });
            }
        });

        // Convert map to array
        const shoppingList = Array.from(ingredientsMap.entries()).map(([key, value]) => {
            const [name] = key.split('-');
            return {
                name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
                quantity: value.quantity,
                unit: value.unit
            };
        });

        res.json(shoppingList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
