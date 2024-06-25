import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import React from "react";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={LandingPage} />
        <Route Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
