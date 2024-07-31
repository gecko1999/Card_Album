import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    const resp = await httpClient.post("http://127.0.0.1:5000/logout");
    console.log(resp.data);
    window.location.reload;
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      <h1>This is Starting Page</h1>
      {user ? (
        <p>You are loged in {user.username}</p>
      ) : (
        <p>you are not logged in</p>
      )}
      <div className="button-span">
        <a href="/login">
          <button>Login</button>
        </a>
        <a href="/register">
          <button>Register</button>
        </a>
        <a>
          <button onClick={logout}>Logout</button>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
