import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../Redux/CartSlice/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserData(data);
        dispatch(login(data));
        toast.success("Logged in Successfully");
        navigate("/"); 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Login Form */}
      <form className={styles.card} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p> New User? <Link to={'/register'}>Register</Link></p>

        {userData && (
          <div className={styles.successBox}>
            <p>
              ✅ Welcome, {userData.firstName} {userData.lastName}!
            </p>
          </div>
        )}
      </form>

      {/* Demo Credentials Box */}
      <div className={styles.demoBox}>
        <h3>Want to explore this app?</h3>
        <p>
          Use these credentials: <br />
          <strong>Username:</strong> emilys <br />
          <strong>Password:</strong> emilyspass
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
