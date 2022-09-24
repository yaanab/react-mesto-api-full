import React from 'react';

function PopupWithForm({ name, title, button = 'Сохранить', isOpen, onClose, onSubmit, children }) {

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div onClick={onClose} className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div onClick={stopPropagation} className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} name={name} className={`popup__form popup__form_${name}`}>
          {children}
          <button type="submit" className="popup__submit-btn">{button}</button>
        </form>
        <button onClick={onClose} aria-label="Закрыть" type="button" className="popup__close-btn"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;