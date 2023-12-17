import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, Space, Button } from "antd";

import LoginContainer from "./containers/Login";
import OperationsContainer from "./containers/Operations";
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
          <Route path="/" element={<OperationsContainer />}>
            <Route path="/operations" element={<OperationsContainer />} />
          </Route>
          <Route path="/agenda" element={<OperationsContainer />}>
            <Route path="/agenda" element={<OperationsContainer />} />
          </Route>
          <Route path="/billing" element={<OperationsContainer />}>
            <Route path="/billing" element={<OperationsContainer />} />
          </Route>

          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
