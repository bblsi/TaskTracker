import { useState } from "react";
import "./App.css";
import "./components/elements/elements.css";
import "./components/crudPage/crudPage.css";
import RegisterForm from "./components/crudPage/RegisterForm";
import LoginForm from "./components/crudPage/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="app-container">
      {/* <RegisterForm /> */}
      <LoginForm />
    </section>
  );
}

export default App;
