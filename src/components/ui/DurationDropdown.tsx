interface DurationDropdownProps {
    duration: string; 
    ondurationChange: (value: string) => void; 
}

export default function DurationDropdown({ duration, ondurationChange }: DurationDropdownProps){ 
    const durationOptions = [ 
        {value: '.5', label: '30 min' }, 
        {value: '1', label: '1hr' },
        {value: '1.5', label: '1hr 30 min'},
        {value: '2', label: '2hrs'},
        {value: '3', label: '3hrs'}
 
    ];

    return (
        <select
           value={duration} 
           onChange={(e) => ondurationChange(e.target.value)}
           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Duration</option>
            {durationOptions.map(durationOption => ( 
               <option key={durationOption.value} value={durationOption.value}>
                {durationOption.label}
               </option> 
            ))}
        </select>
    );
}