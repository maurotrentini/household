import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        unit: { type: String, required: true },
    }],
    instructions: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
