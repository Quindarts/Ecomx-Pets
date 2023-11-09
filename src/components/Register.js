import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/URL/account/register";
    const data = { userName, password, email };
    const regexes = [
      {
        regex: /.{12,}/,
        message: "Password must be at least 12 characters long.",
      },
      {
        regex: /[a-z]/,
        message: "Password must contain at least one lowercase letter.",
      },
      {
        regex: /[A-Z]/,
        message: "Password must contain at least one uppercase letter.",
      },
      { regex: /\d/, message: "Password must contain at least one number." },
      {
        regex: /[@$!%*?&]/,
        message: "Password must contain at least one special character.",
      },
    ];
    const errors = regexes
      .filter(({ regex }) => !regex.test(password))
      .map(({ message }) => message);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await axios.post(url, data);
      setMessage(response.data.message);
      setErrors([]);
    } catch (error) {
      console.error(error);
      setMessage("");
      setErrors(["Registration failed. Please try again."]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {errors.map((error) => (
        <p key={error} style={{ color: "red" }}>
          {error}
        </p>
      ))}
    </form>
  );
};

export default Register;
