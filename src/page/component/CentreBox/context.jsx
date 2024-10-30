import PropTypes from "prop-types";
import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, setState] = useState("");

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
MyProvider.propTypes = {
  // Marking placeholder as required
  children: PropTypes.any,
};
