import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import headerLogo from '../images/Logo.svg';

function Header({ email, onClick }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <div className="header__authorization">
            <h2 className="header__email">{email}</h2>
            <button onClick={onClick} className="header__button">Выйти</button>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default withRouter(Header);


