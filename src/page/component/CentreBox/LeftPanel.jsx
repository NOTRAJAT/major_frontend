import Button_ from "./Button_";
import InputBox from "./InputBox";
import { PropTypes } from "prop-types";
import { SigupJson } from "../../../type";
import { useState } from "react";
import { ValidateRegNo } from "../../../utils";
function LeftPanel({ setBlurWindow, setHookJsonSignup, setLoginOrSignTrue }) {
  const [ErrorInputArray, setErrorInputArray] = useState([false, false, false]);
  let HookJsonSignup = SigupJson;
  const RegNoOnchangeFunc = (event) => {
    HookJsonSignup.registerNo = event.target.value;
    // console.log(HookJsonSignup);
    // console.log(HookJsonSignup);
    setHookJsonSignup(HookJsonSignup);
  };
  const FirstNameOnchangeFunc = (event) => {
    // console.log(HookJsonSignup);
    HookJsonSignup.firstname = event.target.value;
    // console.log(HookJsonSignup);
    setHookJsonSignup(HookJsonSignup);
  };
  const LastNameOnchangeFunc = (event) => {
    // console.log(HookJsonSignup);
    HookJsonSignup.lastname = event.target.value;
    // console.log(HookJsonSignup);
    setHookJsonSignup(HookJsonSignup);
  };

  const ValidationInputBox = () => {
    // console.log(HookJsonSignup);
    if (!ValidateRegNo(HookJsonSignup.registerNo)) {
      setBlurWindow(false);
      setErrorInputArray([true, false, false]);
    } else if (HookJsonSignup.firstname == "") {
      setBlurWindow(false);
      setErrorInputArray([false, true, false]);
      // console.log("here");
    } else if (HookJsonSignup.lastname == "") {
      setBlurWindow(false);
      setErrorInputArray([false, false, true]);
    } else {
      setBlurWindow(true);
      setErrorInputArray([false, false, false]);
    }
    // HookJsonSignup.firstname = "";
    // HookJsonSignup.lastname = "";
    // HookJsonSignup.registerNo = "";

    console.log(HookJsonSignup);
  };
  return (
    <div className=" w-[30%] h-fit  pt-2  ">
      <img src=".\public\svg\getting.svg" alt="" className="w-60 h-12 m-0 " />

      {/* <div className="font-inter_downloaded font-semibold text-4xl ">Getting Started..</div> */}

      <div className="font-open text-[#928E8E] font-medium text-sm  m-0  ps-1 mt-[-6px]">
        Already have an account,
        <span
          className="font-open text-[#373EF1] font-medium text-sm  hover:drop-shadow-2xl hover:text-[#8488ff] hover:cursor-pointer"
          onClick={() => {
            setBlurWindow(true);
            setLoginOrSignTrue();
          }}
        >
          sign-in
        </span>
      </div>

      <div className="flex  mt-4 h-fit justify-center gap-y-10 py-5 flex-col w-11/12">
        <div
          className={`${
            ErrorInputArray[0]
              ? "border-[0.5px] border-rose-700 relative "
              : "border-none relative "
          }`}
        >
          <InputBox
            placeholder="Register number"
            FunctionName={[RegNoOnchangeFunc]}
          />

          {ErrorInputArray[0] && (
            <div className="text-[#e11616] h-6  text-xs   w-2/3  absolute  ps-1">
              required or invalid*
            </div>
          )}
        </div>

        <div
          className={`${
            ErrorInputArray[1]
              ? "border-2 border-rose-700 relative"
              : "border-none relative"
          }`}
        >
          <InputBox
            placeholder="First name"
            FunctionName={[FirstNameOnchangeFunc]}
          />

          {ErrorInputArray[1] && (
            <div className="text-[#e11616] h-6  text-xs   w-2/3  absolute  ps-1">
              required*
            </div>
          )}
        </div>

        <div
          className={`${
            ErrorInputArray[2]
              ? "border-2 border-rose-700 relative"
              : "border-nonerelative"
          }`}
        >
          <InputBox
            placeholder="last name"
            FunctionName={[LastNameOnchangeFunc]}
          />

          {ErrorInputArray[2] && (
            <div className="text-[#e11616] h-6  text-xs   w-2/3  absolute  ps-1">
              required*
            </div>
          )}
        </div>

        <div className="w-10/12  hover:drop-shadow-2xl  rounded-md bg-[#3C40C6] hover:bg-[#545aff] text-xl  font-semibold">
          <Button_
            Name="sign up"
            TextColor="#ffffff"
            FunctionName={[ValidationInputBox]}
            // Params={[!IsBlurWindowVisible]}
          />
        </div>
      </div>
    </div>
  );
}
LeftPanel.propTypes = {
  setBlurWindow: PropTypes.func.isRequired, // Marking placeholder as required
  setHookJsonSignup: PropTypes.func.isRequired,
  setLoginOrSignTrue: PropTypes.func.isRequired,
  // HookJsonSignup: PropTypes.objectof.isRequired,
  // IsBlurWindowVisible: PropTypes.bool.isRequired,
};

export default LeftPanel;
