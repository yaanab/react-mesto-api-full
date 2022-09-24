import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FormAuthorization from "./FormAuthorization";

function Register({ onRegister }) {

  return (
    <>
      <FormAuthorization title="Регистрация" button="Зарегистрироваться" onSubmit={onRegister} />
      <div className="sign-in">
        <p className="sign-in__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="sign-in__link">Войти</Link>
      </div>
    </>
  );
}

export default withRouter(Register);