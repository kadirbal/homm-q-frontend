import { InputHTMLAttributes } from "react";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      {...props}
      className="block w-full px-4 py-2 mt-4 rounded-md border-gray-300 
      focus:ring-indigo-500 focus:border-indigo-500 border
      focus:outline-none"
    />
  );
};

export default Input;
