import FormInput from "../elements/FormInput";

export default function RegisterForm() {
  return (
    <section className="form-container">
      <h2 className="logo">Task Tracker</h2>
      <div className="left-form-wrapper">
        <form className="left-form">
          <h2 className="title">Регистрация</h2>
          <FormInput placeholder="Логин" ariaLabel="username" type="username" />
          <FormInput
            placeholder="Пароль"
            ariaLabel="password"
            type="password"
          />
          <FormInput
            placeholder="Повторный пароль"
            ariaLabel="repeat-password"
            type="password"
          />
          <div className="checkbox-container">
            <input type="checkbox" name="show-password" id="show-password" />
            <label style={{ marginLeft: 8 }} htmlFor="show-password">
              Показать пароль
            </label>
          </div>
          <button className="btn-reg_log">Зарегистрироваться</button>
        </form>
      </div>
      <div className="right-side">
        <h2 className="title">Привет, Чмо!</h2>
        <p className="form-description">
          Уже есть аккаунт ? Нажми кнопку “Войти” и продолжи свое путешествие
        </p>
        <button className="btn-reg_log transparent-back">Войти</button>
      </div>
    </section>
  );
}
