import { useState } from 'react';
import DrinkDropdown from './DrinkDropdown';

export default function DrinkLog(){
    const [drinks, setDrinks] = useState([
        { id: 1, quantity: 1, type: '', size: 'medium', duration: '30' }
    ]);

    const updateDrinkType = (id: number, newType: string) => {
        setDrinks(drinks.map(drink => 
            drink.id === id ? { ...drink, type: newType } : drink
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
                        <span>1</span>
                        
                        {/* Using the DrinkDropdown component */}
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