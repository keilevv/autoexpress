import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import LoginContainer from "./containers/Login";
import DashboardContainer from "./containers/Dashboard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
      </Routes>
    </div>
  );
}

export default App;
