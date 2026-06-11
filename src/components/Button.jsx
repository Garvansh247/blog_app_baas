function Button({
    children,
    onClick,
    className="",
    type="button",
    ...props

}){
    return (
        <button
            type={type}
            className={`px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
export default Button;