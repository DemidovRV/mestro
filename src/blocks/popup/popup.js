export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.popup.querySelector('.popup__close').addEventListener('click', this.closePopup);
  }

  closePopup(event) {   //метод закрытия попапа
    event.target.parentElement.parentElement.classList.remove('popup_is-opened');
  };

  openForm() {   //метод открытия popup 
    this.popup.classList.toggle('popup_is-opened');
  }
}