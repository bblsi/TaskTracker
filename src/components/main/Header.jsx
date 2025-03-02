import accountLogo from "../../assets/account-logo.png";
import "./style/Header.css";
export default function HeaderElement() {
  return (
    <header>
      <div className="header-left">
        <h2 className="logo">Task Tracker</h2>
        <h2 className="logo-mobile">T</h2>
      </div>
      <div className="header-right">
        <button className="btn-exit">Выйти</button>

        <button href="" className="btn-account">
          <img src={accountLogo} alt="" className="account-logo-img" />
        </button>
      </div>
    </header>
  );
}
