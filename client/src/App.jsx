import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginContainer from "./containers/Login";
import OperationsContainer from "./containers/Operations";
import ProtectedRoute from "./components/ProtectedRoute";
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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <OperationsContainer />
              </ProtectedRoute>
            }
          >
            <Route
              path="/operations"
              element={
                <ProtectedRoute>
                  <OperationsContainer />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/agenda"
            element={
              <ProtectedRoute>
                <OperationsContainer />
              </ProtectedRoute>
            }
          >
            <Route path="/agenda" element={<OperationsContainer />} />
          </Route>
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <OperationsContainer />
              </ProtectedRoute>
            }
          >
            <Route path="/billing" element={<OperationsContainer />} />
          </Route>

          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
