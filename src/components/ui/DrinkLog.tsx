import { useState } from 'react';
import DrinkDropdown from './DrinkDropdown';
import NumDrinkDropdown from './NumDrinkDropdown';
import SizeDropdown from './SizeDropdown';
import DurationDropdown from './DurationDropdown';

interface DrinkLogProps {
    onDrinkAdded?: () => void;
}

export default function DrinkLog({ onDrinkAdded }: DrinkLogProps){
    const [drinks, setDrinks] = useState([
        { id: 1, quantity: '', type: '', size: '', duration: '' }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const updateDrinkType = (id: number, newType: string) => {
        setDrinks(drinks.map(drink => 
            drink.id === id ? { ...drink, type: newType } : drink
        ));
    };

    const updateDrinkQuantity = (id: number, newQuantity: string) => {
        setDrinks(drinks.map(drink => 
            drink.id === id ? { ...drink, quantity: newQuantity } : drink
        ));
    };

    const updateDrinkSize = (id: number, newSize: string) => {
        setDrinks(drinks.map(drink => 
            drink.id === id ? { ...drink, size: newSize } : drink
        ));
    };

    const updateDrinkDuration = (id: number, newDuration: string) => {
        setDrinks(drinks.map(drink =>
            drink.id === id ? { ...drink, duration: newDuration } : drink
        ));
    }

    const submitDrinks = async () => {
        setError('');
        setIsSubmitting(true);

        try {
            // Validate all drinks have complete data
            const incompleteDrinks = drinks.filter(d => !d.quantity || !d.type || !d.size || !d.duration);
            if (incompleteDrinks.length > 0) {
                setError('Please fill in all fields for each drink');
                setIsSubmitting(false);
                return;
            }

            // Submit each drink to the API
            for (const drink of drinks) {
                const quantity = parseInt(drink.quantity);
                
                // Map drink type to API format
                let apiType = drink.type;
                if (drink.type === 'vodka') {
                    apiType = 'whiskey_shot'; // Map vodka to whiskey_shot
                }

                // Convert duration from hours to minutes format
                const durationHours = parseFloat(drink.duration);
                const durationMinutes = Math.round(durationHours * 60);
                const durationString = `${durationMinutes} minutes`;

                // Submit this drink 'quantity' times
                for (let i = 0; i < quantity; i++) {
                    const response = await fetch('/api/drink', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: apiType,
                            volumeOz: parseFloat(drink.size),
                            duration: durationString
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to log drink');
                    }
                }
            }

            // Success! Reset form and notify parent
            setDrinks([{ id: Date.now(), quantity: '', type: '', size: '', duration: '' }]);
            if (onDrinkAdded) {
                onDrinkAdded(); // Trigger session refresh
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit drinks');
        } finally {
            setIsSubmitting(false);
        }
    }

    const addNewRow = () => {
        const newDrink = {
            id: Date.now(), 
            quantity: '',
            type: '',
            size: '',
            duration: ''
        };
        setDrinks([...drinks, newDrink]);
    }

    return(
        <div className="flex flex-col justify-center items-center text-center w-[80vw] bg-white mx-auto my-4 p-4 rounded-lg shadow-md">
            <header className="flex flex-row text-center justify-center gap-[16vw] w-full"> 
                <p>Quantity</p>
                <p>Type</p>
                <p>Size</p>
                <p>Duration</p>
            </header>

            <ul className="flex flex-col w-full mt-4 container">
                {drinks.map((drink) => (
                    <li key={drink.id} className="flex flex-row justify-center items-center gap-[11vw] py-2 border-b w-full">
                        <NumDrinkDropdown
                            value={drink.quantity}
                            onChange={(newValue) => updateDrinkQuantity(drink.id, newValue)}
                        />
                        <DrinkDropdown 
                            value={drink.type}
                            onChange={(newValue) => updateDrinkType(drink.id, newValue)}
                        />
                        <SizeDropdown
                            size={drink.size}
                            onSizeChange={(newValue) => updateDrinkSize(drink.id, newValue)}
                        />
                        <DurationDropdown
                            duration={drink.duration}
                            ondurationChange={(newValue) => updateDrinkDuration(drink.id, newValue)} // Fixed prop name case
                        />
                    </li>
                ))}
            </ul>

            {error && (
                <div className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {error}
                </div>
            )}

            <div className="flex gap-3 mt-4">
                <button 
                    onClick={addNewRow}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300"
                    disabled={isSubmitting}
                >
                    + Add Row
                </button>
                <button 
                    onClick={submitDrinks}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Add Drink'}
                </button>
            </div>
        </div>
    )
}