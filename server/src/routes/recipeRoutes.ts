import express from 'express';
import Recipe from '../models/Recipe';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        // In a shared household app, we might want to see ALL recipes, 
        // or just the ones created by the family. For now, let's return all.
        const recipes = await Recipe.find({}).sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private
router.post('/', protect, async (req: any, res) => {
    try {
        const { title, ingredients, instructions } = req.body;

        const recipe = new Recipe({
            user: req.user._id,
            title,
            ingredients,
            instructions,
        });

        const createdRecipe = await recipe.save();
        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Invalid recipe data' });
    }
});

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            await recipe.deleteOne();
            res.json({ message: 'Recipe removed' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
