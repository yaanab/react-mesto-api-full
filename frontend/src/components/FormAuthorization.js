import React from "react";
import {useForm} from '../hooks/useForm';

function FormAuthorization({ title, button, onSubmit }) {
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.password, values.email);
    setValues({});
  }

  return (
    <div className="form">
      <h2 className="form__title">{title}</h2>
      <form onSubmit={handleSubmit} className="form__container">
        <input onChange={handleChange} value={values.email || ""} type="email" name="email" placeholder="Email" className="form__input"
          minLength="4" required autoComplete="on"/>
        <input onChange={handleChange} value={values.password || ""} type="password" name="password" placeholder="Пароль" className="form__input"
          minLength="4" required autoComplete="on"/>
        <button type="submit" className="form__submit-btn">{button}</button>
      </form>
    </div>
  )
}

export default FormAuthorization;