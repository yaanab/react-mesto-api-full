import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__remove ${isOwn ? 'element__remove_visible' : 'element__remove_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-btn ${isLiked && 'element__like-btn_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img onClick={handleClick} src={card.link} alt={card.name} className="element__photo" />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button onClick={handleLike} aria-label="Поставить лайк" type="button" className={cardLikeButtonClassName}></button>
          <p className="element_like-counter">{card.likes.length}</p>
        </div>
        <button onClick={handleCardDelete} aria-label="Удалить фото" type="button" className={cardDeleteButtonClassName}></button>
      </div>
    </article>
  )
}

export default Card;