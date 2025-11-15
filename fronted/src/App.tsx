import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectAuthenticatedUser from "./components/RedirectAuthenticatedUser";
import Layout from "./components/Layout/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        {/* All routes inside Layout */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <Register />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <VerifyEmail />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPassword />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:resetToken"
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />

          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
