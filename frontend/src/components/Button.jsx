/* eslint-disable react/prop-types */
const Button = ({ children, Bgcolor, hoverColor }) => {
  return (
    <div>
      <button
        className={`bg-${Bgcolor}-600 px-4 py-2 rounded-md shadow-md text-white text-sm font-semibold hover:bg-${hoverColor}-700 focus:outline-none`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
