import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/elements/elements.css";
import "./components/crudPage/crudPage.css";
import RegisterForm from "./components/crudPage/RegisterForm";
import LoginForm from "./components/crudPage/LoginForm";
import MainPage from "./components/main/MainPage";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<RegisterForm />} />
    //   <Route path="/login" element={<LoginForm />} />
    // </Routes>
    <MainPage />
  );
}

export default App;
