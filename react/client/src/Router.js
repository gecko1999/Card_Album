import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React from "react";
import AddCard from "./pages/AddCard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={LandingPage} />
        <Route component={NotFound} />
        <Route path="login" exact Component={Login} />
        <Route path="register" exact Component={Register} />
        <Route path="addCard" exact Component={AddCard} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
