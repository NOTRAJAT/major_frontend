import "./App.css";

import HomePage from "./page/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherApp from "./page/WeatherApp";
import SuccessPage from "./page/SuccessFull";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="relative">
                <HomePage />
              </div>
            }
          />

          <Route path="/WeatherApp" element={<WeatherApp />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
    // <>
    //   <WeatherApp />
    // </>
  );
}

export default App;
