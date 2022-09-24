import React from "react";

function InfoTooltip({ isOpen, onClose, image, message }) {

  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div onClick={onClose} className={`popup ${isOpen && "popup_opened"}`}>
      <div onClick={stopPropagation} className="popup__container">
        <div className="info-tool-tip__image" style={{ backgroundImage: `url(${image})` }}></div>
        <p className="info-tool-tip__message">{message}</p>
        <button onClick={onClose} aria-label="Закрыть" type="button" className="popup__close-btn"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;