import { useState } from 'react';
import DrinkDropdown from './DrinkDropdown';
import NumDrinkDropdown from './NumDrinkDropdown';
import SizeDropdown from './SizeDropdown';
import DurationDropdown from './DurationDropdown';

export default function DrinkLog(){
    const [drinks, setDrinks] = useState([
        { id: 1, quantity: '', type: '', size: '', duration: '' }
    ]);

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
            drink.id === id ? { ...drink, duration: newDuration } : drink // Fixed: was updating quantity instead of duration
        ));
    }

    const addNewDrink = () => {
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
            <button 
                onClick={addNewDrink}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Add Drink
            </button>
        </div>
    )
}