import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, Space, Button } from "antd";

import LoginContainer from "./containers/Login";
import DashboardContainer from "./containers/Dashboard";
import "./App.css";

function App() {

  return (
    <div className="app">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "red",
            borderRadius: 8,

            // Alias Token
            colorBgContainer: "#ffff",
          },
        }}
      >
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/dashboard" element={<DashboardContainer />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
