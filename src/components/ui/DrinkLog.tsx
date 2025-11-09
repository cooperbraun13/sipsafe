import { useState } from 'react';
import DrinkDropdown from './DrinkDropdown';
import NumDrinkDropdown from './NumDrinkDropdown';

export default function DrinkLog(){
    const [drinks, setDrinks] = useState([
        { id: 1, quantity: '', type: '', size: 'medium', duration: '30' }
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

    return(
        <div className="flex flex-col justify-center items-center text-center w-[80vw] bg-white mx-auto my-4 p-4 rounded-lg shadow-md">
            <header className="flex flex-row text-center justify-center gap-[16vw] w-full"> 
                <p>Quantity</p>
                <p>Type</p>
                <p>Size</p>
                <p>Duration</p>
            </header>

            <ul className="flex flex-col w-full mt-4">
                {drinks.map((drink) => (
                    <li key={drink.id} className="flex flex-row justify-center items-center gap-[16vw] py-2 border-b">
                        <NumDrinkDropdown
                            value={drink.quantity}
                            onChange={(newValue) => updateDrinkQuantity(drink.id, newValue)}
                        />
                        <DrinkDropdown 
                            value={drink.type}
                            onChange={(newValue) => updateDrinkType(drink.id, newValue)}
                        />
                        
                        <span>Medium</span>
                        <span>30 min</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}