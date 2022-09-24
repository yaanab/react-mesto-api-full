import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <main>
        <section className="profile">
          <div className="profile__user">
            <div onClick={onEditAvatar} className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={onEditProfile} aria-label="Редактировать профиль" type="button" className="profile__edit-btn">
              </button>
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button onClick={onAddPlace} aria-label="Добавить фото" type="button" className="profile__add-btn">
          </button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;