import { useState } from "react";
import React from "react";
import httpClient from "../httpClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/register", {
        email,
        username,
        password,
      });
      console.log(resp.data);
    } catch (error) {
      if (error.response.status === 400) {
        alert("User already exists");
      }
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <p>Please fill out the Form to Register your account</p>
      <form>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </label>
        <button type="button" onClick={() => registerUser()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
