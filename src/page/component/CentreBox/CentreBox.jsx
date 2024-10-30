import Button_ from "./Button_";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { LoginJson, SigupJson } from "../../../type";
import DropDown from "./DropDown";

import {
  ParseYear,
  ValidateEmail,
  ValidatePasswordRegex,
} from "../../../utils";
import { postData } from "../../../request";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, SIGN_URL } from "../../../env";
// import { useContext } from "react";
// import { MyContext } from "./context";
const CentreBox = () => {
  const navigate = useNavigate(); // Hook to navigate to other routes
  const [IsBlurWindowVisible, setBlurWindow] = useState(false);
  const [HookJsonSignup, setHookJsonSignup] = useState(SigupJson);
  const [passwordRegexBool, setPasswordRegexBool] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [badPassword, setbadPassword] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [branchPass, setBranchPass] = useState(false);
  const [yearPass, setYearPass] = useState(false);
  const [addressPass, setAddressPass] = useState(false);
  const [loginOrSignup, setLoginOrSignup] = useState(false);
  const [HookJsonLogin, setHookJsonLogin] = useState(LoginJson);
  const [badEmailLogin, setbadEmailLogin] = useState(false);
  // const { state, setState } = useContext(MyContext);

  const withParamsSetBlurWindow = () => {
    setBlurWindow(!IsBlurWindowVisible);
  };
  const withParamsSetDropDownValue = (ObjectName, casting = (x) => x) => {
    return (event) => {
      setHookJsonSignup((HookJsonSignup) => {
        return {
          ...HookJsonSignup,
          [ObjectName]: casting(event.target.value),
        };
      });
    };
  };

  const withParamValidatePassRegex = (event) => {
    if (ValidatePasswordRegex(event.target.value)) {
      // console.log("here");
      setPasswordRegexBool(false);
      setHookJsonSignup((HookJsonSignup) => {
        return {
          ...HookJsonSignup,
          password: event.target.value,
        };
      });
      return;
    }
    setPasswordRegexBool(true);
  };

  const withParamsUpdataConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };

  const withParamUpdateEmail = (event) => {
    if (ValidateEmail(event.target.value)) {
      // console.log("here");
      setBadEmail(false);
      setHookJsonSignup((HookJsonSignup) => {
        return {
          ...HookJsonSignup,
          email: event.target.value.toLowerCase(),
        };
      });
      return;
    }
    setBadEmail(true);
  };
  const withParamUpdateAddress = (event) => {
    if (event.target.value.length >= 8) {
      // console.log("here");
      setAddressPass(false);
      setHookJsonSignup((HookJsonSignup) => {
        return {
          ...HookJsonSignup,
          address: event.target.value.toLowerCase(),
        };
      });
      return;
    }
    setAddressPass(true);
  };

  useEffect(() => {
    if (passwordRegexBool) {
      setbadPassword(false);
      return;
    }
    if (HookJsonSignup.password === confirmPass) {
      setbadPassword(false);
      return;
    }
    setbadPassword(true);
  }, [HookJsonSignup.password, confirmPass, passwordRegexBool]);

  const FinalJsonValidation = () => {
    if (HookJsonSignup.email === "") {
      setBadEmail(true);
      return false;
    }
    if (HookJsonSignup.password === "") {
      setBadEmail(false);
      setPasswordRegexBool(true);
      return false;
    }
    if (HookJsonSignup.branch === "Branch") {
      setBadEmail(false);
      setPasswordRegexBool(false);
      setBranchPass(true);

      return false;
    }
    if (HookJsonSignup.year === 0) {
      console.log("4");
      setBadEmail(false);
      setPasswordRegexBool(false);
      setBranchPass(false);
      setYearPass(true);

      return false;
    }
    if (HookJsonSignup.address === "") {
      setBadEmail(false);
      setPasswordRegexBool(false);
      setBranchPass(false);
      setYearPass(false);
      setAddressPass(true);
      return false;
    }

    if (badPassword) {
      return false;
    }
    setBadEmail(false);
    setPasswordRegexBool(false);
    setBranchPass(false);
    setYearPass(false);
    setAddressPass(false);
    return true;
  };

  const SignUpPost = () => {
    console.log(FinalJsonValidation());
    if (FinalJsonValidation()) {
      const message = postData(HookJsonSignup, SIGN_URL);
      // console.log("valusse");
      message.then((res) => {
        if (res.status == 200)
          navigate("/success", { state: { message: res.data } });
      });
    }
  };

  const withParamUpdateEmailLogin = (event) => {
    if (ValidateEmail(event.target.value)) {
      // console.log("here");
      setbadEmailLogin(false);
      setHookJsonLogin((HookJsonLogin) => {
        return {
          ...HookJsonLogin,
          email: event.target.value.toLowerCase(),
        };
      });
      return;
    }
    setbadEmailLogin(true);
  };

  const withParamUpdatePassLogin = (event) => {
    // console.log("here");

    setHookJsonLogin((HookJsonLogin) => {
      return {
        ...HookJsonLogin,
        password: event.target.value,
      };
    });
    return;
  };

  const withParamsSetLoginOrSign = (state = false) => {
    return () => setLoginOrSignup(state);
  };

  const LoginPost = () => {
    if (HookJsonLogin.email != "") {
      const message = postData(HookJsonLogin, LOGIN_URL);
      // console.log("valusse");
      message.then((res) => {
        if (res.status == 200) {
          // setState(res.data.value);
          // navigate("/WeatherApp");
          console.log(res.data);
          navigate("/WeatherApp", { state: { loginPayload: res.data } });
        }
      });

      return;
    }
    setbadEmailLogin(true);
  };
  return (
    <>
      <div className="w-8/12  h-2/3  drop-shadow-[60px_60px_80px_rgba(0,0,0,.50)]  rounded-2xl px-12 bg-white  flex flex-row justify-center  items-center ">
        <LeftPanel
          setBlurWindow={setBlurWindow}
          IsBlurWindowVisible={IsBlurWindowVisible}
          setHookJsonSignup={setHookJsonSignup}
          setLoginOrSignTrue={withParamsSetLoginOrSign(true)}
        />
        <RightPanel />
      </div>

      {/* blur-window */}
      {IsBlurWindowVisible && (
        <div className="w-[100vw]  h-[100vh] bg-black bg-opacity-50 backdrop-blur-2xl absolute top-0 left-0 z-10 text-white p-4  flex justify-center items-center">
          {/* <div className="w-96 border-2 border-white">
            {JSON.stringify(HookJsonSignup, null, 2)}
            {addressPass ? 1 : 2}
          </div> */}
          {/* white-box  sign-up*/}
          {!loginOrSignup && (
            <div className="w-96 h-[70%]  flex  flex-col gap-y-6   rounded-md bg-white   px-4 pt-12 font-open text-[#928E8E] font-medium text-sm items-center ">
              <div className="  flex  flex-col w-10/12 h-80 justify-between items-center  ">
                <div
                  className={`${
                    badEmail
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <InputBox
                    placeholder="Email"
                    FunctionName={[withParamUpdateEmail]}
                  />
                  {badEmail && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-full  absolute  ps-1">
                      {`Invalid email*`}
                    </div>
                  )}
                </div>

                <div
                  className={`${
                    passwordRegexBool | badPassword
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <InputBox
                    placeholder="Password"
                    Type="password"
                    FunctionName={[withParamValidatePassRegex]}
                  />
                  {passwordRegexBool && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-full  absolute  ps-1">
                      {`Uppercase, length>8, Special char(@,!),numerical (01...9)`}
                    </div>
                  )}
                </div>

                <div
                  className={`${
                    badPassword
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <InputBox
                    placeholder="Confirm-password"
                    Type="password"
                    FunctionName={[withParamsUpdataConfirmPass]}
                  />
                  {badPassword && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-2/3  absolute  ps-1">
                      Passwords Dont Match*
                    </div>
                  )}
                </div>

                {/* <InputBox placeholder="Branch" /> */}

                {/* Drop-Down For Branch */}
                <div
                  className={`${
                    branchPass
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <DropDown
                    OptionList={[
                      "Branch",
                      "Cs-IotCSBC",
                      "CS-Comp",
                      "Mechanical",
                      "Electrical",
                      "AI/DS",
                    ]}
                    FunctionName={[withParamsSetDropDownValue("branch")]}
                  />
                  {branchPass && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-2/3  absolute  ps-1">
                      Select a branch*
                    </div>
                  )}
                </div>

                {/* <DropDown for year /> */}
                <div
                  className={`${
                    yearPass
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <DropDown
                    OptionList={["Year", "First", "Second", "Third", "Fourth"]}
                    FunctionName={[
                      withParamsSetDropDownValue("year", ParseYear),
                    ]}
                  />

                  {yearPass && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-2/3  absolute  ps-1">
                      Select a branch*
                    </div>
                  )}
                </div>

                <div
                  className={`${
                    addressPass
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <InputBox
                    placeholder="Address"
                    FunctionName={[withParamUpdateAddress]}
                  />
                  {addressPass && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-full  absolute  ps-1">
                      {`Invalid address*`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-x-4 w-full">
                <div className="w-full  hover:drop-shadow-2xl  rounded-md bg-[#c04545] hover:bg-[#ff549e] text-base  font-semibold">
                  <Button_
                    Name="<-Back"
                    TextColor="#ffffff"
                    FunctionName={[withParamsSetBlurWindow]}
                    // Params={[!IsBlurWindowVisible]}
                  />
                </div>
                <div className="w-full hover:drop-shadow-2xl  rounded-md bg-[#3C40C6] hover:bg-[#545aff] text-base  font-semibold">
                  <Button_
                    Name="sign up"
                    TextColor="#ffffff"
                    FunctionName={[SignUpPost]}
                    // Params={[!IsBlurWindowVisible]}
                  />
                </div>
              </div>
            </div>
          )}
          {/* white-box sign-in  */}

          {loginOrSignup && (
            <div className="w-80 h-[32%]  flex  flex-col gap-y-6   rounded-md bg-white   px-4 pt-12 font-open text-[#928E8E] font-medium text-sm items-center ">
              <div className="  flex  flex-col w-10/12 h-20 justify-between items-center  ">
                {/* {JSON.stringify(HookJsonLogin)} */}
                <div
                  className={`${
                    badEmailLogin
                      ? "border-[0.5px] border-rose-700 relative w-full flex justify-center rounded-sm"
                      : "border-none relative w-full flex justify-center"
                  }`}
                >
                  <InputBox
                    placeholder="Email"
                    FunctionName={[withParamUpdateEmailLogin]}
                  />
                  {badEmailLogin && (
                    <div className="text-[#e11616] h-6  text-xs top-6 left-2  w-full  absolute  ps-1">
                      {`Invalid email*`}
                    </div>
                  )}
                </div>
                <div
                  className={`${"border-none relative w-full flex justify-center"}`}
                >
                  <InputBox
                    placeholder="Password"
                    Type="password"
                    FunctionName={[withParamUpdatePassLogin]}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-4 w-full">
                <div className="w-full  hover:drop-shadow-2xl  rounded-md bg-[#c04545] hover:bg-[#ff549e] text-base  font-semibold">
                  <Button_
                    Name="<-Back"
                    TextColor="#ffffff"
                    FunctionName={[
                      withParamsSetBlurWindow,
                      withParamsSetLoginOrSign(false),
                      () => badEmailLogin(false),
                    ]}
                    // Params={[!IsBlurWindowVisible]}
                  />
                </div>
                <div className="w-full hover:drop-shadow-2xl  rounded-md bg-[#3C40C6] hover:bg-[#545aff] text-base  font-semibold">
                  <Button_
                    Name="Sign In"
                    TextColor="#ffffff"
                    FunctionName={[LoginPost]}
                    // Params={[!IsBlurWindowVisible]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CentreBox;
