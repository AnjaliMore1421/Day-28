import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data);
      } else {
        if (email === "admin@hospital.com" && password === "admin123") {
          onLoginSuccess({ name: "Admin User" });
        } else {
          setError("Invalid Credentials. Try admin@hospital.com / admin123");
        }
      }
    } catch (err) {
      if (email === "admin@hospital.com" && password === "admin123") {
        onLoginSuccess({ name: "Admin User" });
      } else {
        setError("Connection failed. Use admin@hospital.com / admin123");
      }
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ width: "350px", margin: "100px auto" }}
        aria-label="Login Form"
      >
        <h2 style={{ textAlign: "center", color: "#0f172a" }}>
          🏥 MediCare Login
        </h2>

        {error && (
          <p
            style={{
              color: "#721c24",
              background: "#f8d7da",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          {/* ✅ Email Field */}
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="admin@hospital.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {/* ✅ Password Field */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {/* ✅ Button */}
          <button
            type="submit"
            aria-label="Login"
            style={{
              marginTop: "10px",
              background: "#0f172a",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
