const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`border border-black py-2 rounded-full px-6 font-medium transition-all duration-300  ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
