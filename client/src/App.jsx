import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Land from "./pages/Land-Page/Land";
import Dashboard from "./pages/Dashboard/Dashboard";

import { ProtectedRoute, PublicRoute } from "./route-guards/Guard";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import Loader from "./comman/Loader";

const App = () => {
  const { checkAuth, checkingAuth } = useAuthStore();
  React.useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#000",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#000",
            },
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Land />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
