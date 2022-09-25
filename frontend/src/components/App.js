import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import * as auth from '../utils/auth';
import successfulMessage from '../images/successful-message.svg';
import erroMessage from '../images/error-message.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isInfoToolPopupOpen, setInfoToolPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isPopupClose, setIsPopupClose] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [infoTooltipMessage, setinfoTooltipMessage] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || selectedCard;

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
        console.log(cards)
        // console.log(user)
      })
      .catch((err) => console.log(err));
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getContent()
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmation(card) {
    setConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  function handleInfoToolPopupOpen() {
    setInfoToolPopupOpen(true);
  }

  function closeAllPopups() {
    setIsPopupClose(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setInfoToolPopupOpen(false);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen])

  function handleUpdateUser(name, description) {
    setIsLoading(true);
    api
      .editProfile(name, description)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setIsLoading(false));
  }

  function handleAddPlaceSubmit(title, link) {
    setIsLoading(true);
    api
      .addCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
          console.log(cards)
        })
        .catch((err) => console.log(err));
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
          console.log(cards)
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(deletedCard) {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setIsLoading(false));
  }

  function handleUserRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        handleInfoToolPopupOpen();
        setinfoTooltipMessage('Вы успешно зарегистрировались!');
        setInfoTooltipImage(successfulMessage);
        history.push('/sign-in');
      })
      .catch((err) => {
        handleInfoToolPopupOpen();
        setinfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipImage(erroMessage);
      });
  }

  function handleUserLogin(password, email) {
    if (!password || !email) {
      return;
    }
    auth.authorize(password, email)
      .then(
        (data) => {
          if (data.token) {
            setEmail(email);
            setLoggedIn(true);
            history.push('/');
          }
        })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    auth.logOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <div className="page">
          <Header
            email={email}
            onClick={onSignOut}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmation}
            />
            <Route path="/sign-in">
              <Login
                onLogin={handleUserLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={handleUserRegister}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />
          <ConfirmationPopup
            card={deletedCard}
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            isLoading={isLoading} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoToolPopupOpen}
            onClose={closeAllPopups}
            message={infoTooltipMessage}
            image={infoTooltipImage} />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
