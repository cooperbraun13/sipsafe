// DrinkDropdown.js
interface DrinkDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

export default function DrinkDropdown({ value, onChange }: DrinkDropdownProps){
    const drinkOptions = [
        {value: 'beer', label: 'Beer' },
        {value: 'wine', label: 'Wine' },
        {value: 'vodka', label: 'Vodka'} 
    ];

    return (
        <select
           value={value}
           onChange={(e) => onChange(e.target.value)}
           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Drink</option>
            {drinkOptions.map(drink => (
               <option key={drink.value} value={drink.value}>
                {drink.label}
               </option> 
            ))}
        </select>
    );
}