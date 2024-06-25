import React from "react";

const LandingPage = () => {
  return (
    <div>
      <h1>This is Starting Page</h1>

      <p>you are not logged in</p>

      <div className="button-span">
        <a href="/login">
          <button>Login</button>
        </a>
        <a href="/login">
          <button>Register</button>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
