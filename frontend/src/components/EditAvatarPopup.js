import { useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button={isLoading? "Сохранение..." : "Сохранить"}>
      <input ref={avatarRef} id="avatar-src-input" type="url" name="avatar" placeholder="Ccылка на аватар"
        className="popup__text popup__text_avatar_url" required />
      <span className="avatar-src-input-error popup__text-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;