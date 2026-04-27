import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);

  // 🔹 Login Screen
  if (!user) {
    return (
      <Login
        onLoginSuccess={(userData) => {
          setUser(userData);
          setPage("dashboard"); // 🔥 important for test + UI consistency
        }}
      />
    );
  }

  // 🔹 Main App
  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} />

      <div className="main">
        <Header />

        {page === "dashboard" && <Dashboard />}
        {page === "patients" && <Patients />}
        {page === "doctors" && <Doctors />}
      </div>
    </div>
  );
}
