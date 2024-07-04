import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PrimeSidebar from "./components/Sidebar";
import PrimeHeader from "./components/Header";
import './App.css';

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/users/Users"));
const CreateUsers = lazy(() => import("./pages/users/CreateUser"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const Product = lazy(() => import("./pages/product/Product"));
const ProfileUpdate = lazy(() => import("./pages/users/ProfileUpdate"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const showHeaderAndSidebar = location.pathname !== "/login";

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {showHeaderAndSidebar && <PrimeSidebar sidebarWidth="280px" />}
      <div style={{ flexGrow: 1 }}>
        {showHeaderAndSidebar && <PrimeHeader />}
        <main style={{ padding: "1rem" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/dashboard" />} />
              <Route path="/user" element={isAuthenticated ? <Users /> : <Navigate to="/user" />} />
              <Route path="/create-user" element={isAuthenticated ? <CreateUsers /> : <Navigate to="/create-user" />} />
              <Route path="/edit-user/:id" element={isAuthenticated ? <CreateUsers /> : <Navigate to="/edit-user" />} />
              <Route path="/profile-update" element={isAuthenticated ? <ProfileUpdate /> : <Navigate to="/profile-update" />} />
              
              <Route path="/product" element={isAuthenticated ? <Product /> : <Navigate to="/product" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
