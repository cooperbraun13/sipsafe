interface SizeDropdownProps {
    size: string; 
    onSizeChange: (value: string) => void; 
}

export default function SizeDropdown({ size, onSizeChange }: SizeDropdownProps){ 
    const sizeOptions = [ 
        {value: '2', label: 'Shot' }, 
        {value: '8', label: '8 oz' },
        {value: '12', label: '12 oz'},
        {value: '16', label: '16 oz'},
        {value: '24', label: '24 oz'} 
    ];

    return (
        <select
           value={size} 
           onChange={(e) => onSizeChange(e.target.value)} 
           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Size</option>
            {sizeOptions.map(sizeOption => (
               <option key={sizeOption.value} value={sizeOption.value}>
                {sizeOption.label}
               </option> 
            ))}
        </select>
    );
}