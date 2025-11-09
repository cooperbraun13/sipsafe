interface NumDrinkDropdownProps {
    value: string;  // CHANGED TO STRING
    onChange: (value: string) => void;
}

export default function NumDrinkDropdown({ value, onChange }: NumDrinkDropdownProps) {
    const numOptions = [
        {value: '1', label: '1'},  // CHANGED TO STRINGS
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5'},
        {value: '6', label: '6'},
        {value: '7', label: '7'},
        {value: '8', label: '8'},
        {value: '9', label: '9'},
        {value: '10', label: '10'}
    ];

    return(
        <select
           value={value}
           onChange={(e) => onChange(e.target.value)}
           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Number of Drinks</option>
            {numOptions.map(num => (
               <option key={num.value} value={num.value}>
                {num.label}
               </option> 
            ))}
        </select>
    )
}