import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    mealType: {
        type: String, // e.g., 'Dinner', 'Lunch'
        default: 'Dinner',
    },
}, {
    timestamps: true,
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;
