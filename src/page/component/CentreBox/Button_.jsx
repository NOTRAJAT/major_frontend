import PropTypes from "prop-types";

const Button_ = ({ Name, TextColor, FunctionName }) => {
  return (
    <>
      <button
        className="w-full h-12 rounded-lg text-center flex justify-center items-center  font-open "
        onClick={() => {
          FunctionName.forEach((definedFunc) => {
            definedFunc();
            // console.log("here");
          });
        }}
      >
        <div style={{ color: TextColor }}>{Name}</div>
      </button>
    </>
  );
};

Button_.propTypes = {
  Name: PropTypes.string.isRequired,
  TextColor: PropTypes.string.isRequired,

  FunctionName: PropTypes.arrayOf(PropTypes.func),
  // Params: PropTypes.arrayOf(any),
};

export default Button_;
