import { useNavigate } from "react-router-dom";
import accountLogo from "../../assets/account-logo.png";
import "./style/Header.css";

export default function HeaderElement() {
  const navigate = useNavigate();

  function handleLogout() {
    return localStorage.removeItem("token"), navigate("/login");
  }

  return (
    <header>
      <div className="header-left">
        <h2 className="logo">Task Tracker</h2>
        <h2 className="logo-mobile">T</h2>
      </div>
      <div className="header-right">
        <button className="btn-exit" onClick={handleLogout}>
          Выйти
        </button>

        <button className="btn-account">
          <img src={accountLogo} alt="" className="account-logo-img" />
        </button>
      </div>
    </header>
  );
}
