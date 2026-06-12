import { forwardRef,useId } from "react";

function Select({
    options,
    label,
    className="",
    ...props
},ref){
    const id=useId();
    return (
        <div>
            {label &&
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={id}>
                    {label}
                </label>
            }
            <select  
            id={id} 
            className={`bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
            ref={ref}
            >
                {
                    options.map((option)=>(
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default forwardRef(Select);