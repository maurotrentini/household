import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Recipe {
    _id: string;
    title: string;
    ingredients: { name: string; quantity: string; unit: string }[];
    instructions: string;
}

const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            try {
                const { data } = await axios.get('http://localhost:5000/api/recipes', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setRecipes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipes();
    }, []);

    const addToMealPlan = async (recipeId: string) => {
        const date = prompt('Enter date (YYYY-MM-DD) for this meal:', new Date().toISOString().split('T')[0]);
        if (!date) return;

        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        try {
            await axios.post('http://localhost:5000/api/meal-plans', {
                date,
                recipeId,
                mealType: 'Dinner'
            }, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            alert('Added to Meal Plan!');
        } catch (error) {
            console.error(error);
            alert('Failed to add to meal plan');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Recipes</h1>
                <Link to="/recipes/new" className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                    Add Recipe
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="rounded border p-4 shadow">
                        <h2 className="mb-2 text-xl font-bold">{recipe.title}</h2>
                        <p className="mb-2 text-gray-600">{recipe.ingredients.length} ingredients</p>
                        <div className="mb-4 text-sm text-gray-500 line-clamp-3">{recipe.instructions}</div>
                        <button
                            onClick={() => addToMealPlan(recipe._id)}
                            className="w-full rounded bg-blue-100 py-2 text-blue-600 hover:bg-blue-200"
                        >
                            Add to Meal Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
