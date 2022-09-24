import React, { useContext, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {useForm} from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.about);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button={isLoading? "Сохранение..." : "Сохранить"}>
      <input onChange={handleChange} value={values.name || ""} id="name-input" type="text" name="name" placeholder="Имя" className="popup__text popup__text_type_name"
        minLength="2" maxLength="40" required />
      <span className="name-input-error popup__text-error"></span>
      <input onChange={handleChange} value={values.about || ""} id="job-input" type="text" name="about" placeholder="О себе" className="popup__text popup__text_type_about"
        minLength="2" maxLength="200" required />
      <span className="job-input-error popup__text-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;