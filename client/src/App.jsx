import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginContainer from "./containers/Login";
import OperationsContainer from "./containers/Operations";
import MainLayout from "./containers/Layout";
import ProtectedRoute from "./helpers/ProtectedRoute";
/* Hooks */
import useMenu from "./hooks/useMenu";
/* Components*/
import Jobs from "./components/operations/Jobs";
import Cars from "./components/operations/Cars";
import Operators from "./components/operations/Operators";
import Clients from "./components/operations/Clients";
import Settings from "./components/operations/Settings";
import Dashboard from "./components/operations/Dashboard";

/* Styling */
import "./App.css";

function App() {
  const { defaultSelectedHeader } = useMenu();
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
            path="/operations"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/jobs"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <Jobs />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/cars"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Cars />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/operators"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Operators />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/clients"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Clients />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <OperationsContainer />
              </ProtectedRoute>
            }
          ></Route>
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
