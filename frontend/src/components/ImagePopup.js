import React from "react";

function ImagePopup({ card, onClose }) {

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div onClick={onClose} className={`popup popup-img ${card && "popup_opened"}`}>
      <div onClick={stopPropagation} className="popup-img__container">
        <img src={card?.link} alt={card?.name} className="popup-img__photo" />
        <h2 className="popup-img__title">{card?.name}</h2>
        <button onClick={onClose} aria-label="Закрыть фото" type="button" className="popup__close-btn"></button>
      </div>
    </div>
  );
}

export default ImagePopup;

