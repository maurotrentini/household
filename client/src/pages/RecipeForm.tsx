import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
    const navigate = useNavigate();

    const handleIngredientChange = (index: number, field: string, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        try {
            await axios.post(
                'http://localhost:5000/api/recipes',
                { title, ingredients, instructions },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            navigate('/recipes');
        } catch (error) {
            console.error(error);
            alert('Failed to save recipe');
        }
    };

    return (
        <div className="container mx-auto max-w-2xl p-4">
            <h1 className="mb-6 text-3xl font-bold">Add New Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="mb-2 block font-bold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block font-bold">Ingredients</label>
                    {ingredients.map((ing, index) => (
                        <div key={index} className="mb-2 flex gap-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={ing.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                className="flex-1 rounded border p-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Qty"
                                value={ing.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                className="w-20 rounded border p-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Unit"
                                value={ing.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                className="w-20 rounded border p-2"
                                required
                            />
                            {ingredients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="text-red-500"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="text-blue-500 hover:underline"
                    >
                        + Add Ingredient
                    </button>
                </div>

                <div>
                    <label className="mb-2 block font-bold">Instructions</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="h-32 w-full rounded border p-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                    Save Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;
