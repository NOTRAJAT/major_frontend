import { PropTypes } from "prop-types";

const InputBox = ({ placeholder, FunctionName, Type = "text" }) => {
  return (
    <>
      <input
        type={Type}
        className="w-full border-b-[1px] border-[#b0b0b086] rounded-sm  font-open text-sm focus:border-b-[1px] focus:outline-none ps-2"
        placeholder={placeholder}
        onChange={(event) => {
          FunctionName.forEach((definedFunc) => {
            definedFunc(event);
            // console.log("here-input");
          });
        }}
      />
    </>
  );
};
InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired, // Marking placeholder as required
  FunctionName: PropTypes.arrayOf(PropTypes.func),
  Type: PropTypes.string,
};
export default InputBox;
