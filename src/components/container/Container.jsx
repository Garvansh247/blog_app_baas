function Container({children,className}){

  // Simple responsive container: centers content and restricts max width.
  // Do not apply background, rounded corners, or text color here so the
  // header/footer or page-specific cards control their own styling.
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 py-4 ${className}`}>
      {children}
    </div>
  )

}
export default Container;