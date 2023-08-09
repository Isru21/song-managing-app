import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful, handle further actions (e.g., redirect to another page)
        console.log("Login successful!");
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data));

        // Redirect to the "api/songs" page
        window.location.href = "/songs"; // You can also use React Router's history object to navigate programmatically if needed
      } else {
        // Login failed, handle the error
        console.log("Login failed");
        alert("Wrong password");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>
        <br />
        <Link to={`/register`}>
          {" "}
          <button type="submit" className="btn">
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
