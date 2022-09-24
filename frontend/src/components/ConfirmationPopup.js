import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ card, isOpen, onClose, onClosePopupByOverlay, onSubmit, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      button={isLoading? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onClosePopupByOverlay={onClosePopupByOverlay}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default ConfirmationPopup;