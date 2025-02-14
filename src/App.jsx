import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/elements/elements.css";
import "./components/crudPage/crudPage.css";
import RegisterForm from "./components/crudPage/RegisterForm";
import LoginForm from "./components/crudPage/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
