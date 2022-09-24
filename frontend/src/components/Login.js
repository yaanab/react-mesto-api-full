import React from "react";
import { withRouter } from 'react-router-dom';
import FormAuthorization from "./FormAuthorization";

function Login({ onLogin }) {

  return (
    <FormAuthorization title="Вход" button="Войти" onSubmit={onLogin} />
  );
}

export default withRouter(Login);
