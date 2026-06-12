import { forwardRef } from "react";
import { useId } from "react";
const Input=forwardRef(function Input({
    label,
    placeholder,
    type="text",
    value,
    onChange,
    className="",
    ...props
},ref){
    const id=useId();
    return (
        <div className="w-full">
            {label &&

                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={id}>
                    {label}
                </label>
            }
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
        
    )

}
)

export default Input;