import { PropTypes, func, string } from "prop-types";
import { useState } from "react";
const DropDown = ({ FunctionName, OptionList }) => {
  const [listValue, setListValue] = useState("Branch");

  return (
    <>
      <select
        id="component"
        value={listValue}
        className="w-full border-b-[1px] border-[#b0b0b086] rounded-sm  font-open  focus:border-b-[1px] focus:outline-none ps-2 "
        onChange={(event) => {
          FunctionName.forEach((definedFunc) => {
            definedFunc(event);
            setListValue(event.target.value);
            // console.log("here-input");
          });
        }}
      >
        {/* <option value="empty">Branch</option> */}
        {OptionList.map((Value, Index) => {
          return (
            <option value={Value} key={Index}>
              {Value}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default DropDown;

DropDown.propTypes = {
  // Marking placeholder as required
  FunctionName: PropTypes.arrayOf[func],
  OptionList: PropTypes.arrayOf(string),
};
