import { useState } from "react";
import "./App.css";
import "./components/elements/elements.css";
import "./components/crudPage/crudPage.css";
import RegisterForm from "./components/crudPage/RegisterForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="app-container">
      <RegisterForm />
    </section>
  );
}

export default App;
