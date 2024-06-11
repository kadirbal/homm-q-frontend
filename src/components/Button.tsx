interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 mt-4 w-full text-white bg-indigo-500 rounded-md 
      hover:bg-indigo-600 focus:outline-none focus:ring-2 
      focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
