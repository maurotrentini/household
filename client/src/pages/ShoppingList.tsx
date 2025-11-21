import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

const ShoppingList = () => {
    const [items, setItems] = useState<Ingredient[]>([]);
    const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [endDate, setEndDate] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }));

    useEffect(() => {
        fetchShoppingList();
    }, [startDate, endDate]);

    const fetchShoppingList = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        try {
            const { data } = await axios.get('http://localhost:5000/api/shopping-list', {
                params: {
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                },
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrevWeek = () => {
        setStartDate(addDays(startDate, -7));
        setEndDate(addDays(endDate, -7));
    };

    const handleNextWeek = () => {
        setStartDate(addDays(startDate, 7));
        setEndDate(addDays(endDate, 7));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Shopping List</h1>
                <div className="flex gap-2 items-center">
                    <button onClick={handlePrevWeek} className="rounded border px-3 py-1">&lt;</button>
                    <span className="font-bold">
                        {format(startDate, 'MMM d')} - {format(endDate, 'MMM d')}
                    </span>
                    <button onClick={handleNextWeek} className="rounded border px-3 py-1">&gt;</button>
                </div>
            </div>

            <div className="rounded border bg-white p-4 shadow">
                {items.length === 0 ? (
                    <p className="text-gray-500">No items found for this period.</p>
                ) : (
                    <ul className="divide-y">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center justify-between py-2">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-600">
                                    {item.quantity} {item.unit}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ShoppingList;
