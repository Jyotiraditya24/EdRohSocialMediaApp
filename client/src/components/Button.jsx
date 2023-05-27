const Button = ({ label = "click", type = "" }) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-gradient-to-r from-yellow-200 to-cyan-500 rounded-xl 
      hover:bg-gradient-to-r hover:scale-105 transition duration-150 focus:text-black hover:font-bold"
    >
      {label}
    </button>
  );
};
export default Button;
