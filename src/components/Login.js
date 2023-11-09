import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "URL/account/login";
    const data = { email, password };
    try {
      const response = await axios.post(url, data);
      setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setMessage("Login successful.");
      setErrors([]);
      setUserName(response.data.userName);
    } catch (error) {
      console.error(error);
      setMessage("");
      setErrors(["Login failed. Please try again."]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {errors.map((error) => (
        <p key={error} style={{ color: "red" }}>
          {error}
        </p>
      ))}
      {accessToken && <p>Access token: {accessToken}</p>}
      {userName && <p>Hello {userName} :)</p>}
    </form>
  );
};

export default Login;
