import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import { toast,Toaster } from 'sonner'

import Dashboard from "./components/Dashboard";
import SimulationModule from "./components/SimulationModule";
import FeedbackModule from "./components/FeedbackModule";
import ReportingDashboard from "./components/ReportingDashboard";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAppStore } from "./Context/Zustand";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const setUserEmail = useAppStore((state) => state.setUserEmail);
  const setToken = useAppStore((state) => state.setToken);
  const token = useAppStore((state) => state.token);
  // const { isAuthenticated,setIsAuthenticated , setUserEmail, setToken } = useContext(DispatchContext);

  // useEffect(() => {
  //   const authToken = localStorage.getItem('authToken');
  //   const usermail = localStorage.getItem('usermail')
  //   setToken(authToken)
  //   setUserEmail(usermail)
  //  console.log(token)
  //   setIsAuthenticated(!!authToken);
  // }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <main className="flex-1 overflow-y-auto bg-gradient-to-r from-emerald-500 to-emerald-900">
        <Toaster richColors closeButton position='top-right' />
          {isAuthenticated && <Header />}
         
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/simulation"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SimulationModule />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/feedback"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <FeedbackModule />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ReportingDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
