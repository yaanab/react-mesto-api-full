import { useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import {useForm} from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    setValues({})
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values.place, values.image);
  }

  return (
    <PopupWithForm
      name="item"
      title="Новое место"
      button={isLoading? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input onChange={handleChange} value={values.place || ""} id="place-name-input" type="text" name="place" placeholder="Название"
        className="popup__text popup__text_place_name" minLength="2" maxLength="30" required />
      <span className="place-name-input-error popup__text-error"></span>
      <input onChange={handleChange} value={values.image || ""} id="image-src-input" type="url" name="image" placeholder="Ccылка на картинку"
        className="popup__text popup__text_place_url" required />
      <span className="image-src-input-error popup__text-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;