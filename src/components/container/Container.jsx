function Container({children,className}){

  return (
    <div className={`w-full max-w-3xl mx-auto px-4 py-8  bg-slate-900 rounded-lg shadow-md   text-white ${className}`}>
      {children}
    </div>
  )

}
export default Container;