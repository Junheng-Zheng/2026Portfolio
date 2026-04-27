const P = ({ children, className }) => {
  return (
    <p className={`text-sm  flex items-center gap-2 ${className}`}>
      {children}
    </p>
  );
};

export default P;
