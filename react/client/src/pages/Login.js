import React, { useState } from "react";
import httpClient from "../httpClient";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    console.log(username, password);

    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid login");
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Please fill out the Form to Login to your account</p>
      <form>
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
        <button type="button" onClick={() => logInUser()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
