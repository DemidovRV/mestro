import "./style.css";
import { Card } from './blocks/place-card/card.js';
import { Popup } from './blocks/popup/popup.js';
import { api } from './blocks/api.js';

const popupAddImg = new Popup('.popup__add-img');
const popupEditProfile = new Popup('.popup__edit-profile');
const cardContain = document.querySelector('.places-list');
const popupImage = document.querySelector('.card');

// класс списка картинок
class CardList {
  constructor(container) {
    this.container = container;
    this.cards = [];
    const closePopupImage = document.querySelector('.card__close');
    closePopupImage.addEventListener('click', this.openCard);
  }

  addCard(name, link) { // добавить картинку
    const { cardElement } = new Card(name, link);
    this.cards.push(cardElement);
    this.container.appendChild(cardElement);
  }

  openCard(event) {
    popupImage.classList.toggle('card_active');
  }

  addCardsArr(arr) { // перебор массива
    for (let i = 0; i < arr.length; i++) {
      this.addCard(arr[i].name, arr[i].link);
    }
  }
}

const cardlist = new CardList(document.querySelector('.places-list'));
const popupWindow = document.querySelector('.popup__add-img');
const form = document.forms.imgPopup;
const name = form.elements.name;
const link = form.elements.link;

//функция создания новой карточки картинки
function addCardNew(event) {
  event.preventDefault();
  cardlist.addCard(name.value, link.value);
  form.reset();
  popupAddImg.openForm();
};

const addCardButton = popupWindow.querySelector('.popup__button');

//функция проверки валидности input текста
function validityInput(inputName, spanErrorSelector) {
  inputName.addEventListener("input", (event) => {
    let errorSpan = document.querySelector(spanErrorSelector);
    if (inputName.validity.valueMissing) {
      errorSpan.textContent = 'Это обязательное поле';
    } else if (inputName.validity.tooShort) {
      errorSpan.textContent = 'Должно быть от 4 до 30 символов';
    } else {
      errorSpan.textContent = '';
    }
  })
};

//проверка валидноси ссылки
link.addEventListener("input", (event) => {
  let errorSpan = document.querySelector('.error_link');
  if (link.validity.valueMissing) {
    errorSpan.textContent = 'Это обязательное поле';
  } else if (link.validity.typeMismatch) {
    errorSpan.textContent = 'Здесь должна быть ссылка';
  } else {
    errorSpan.textContent = '';
  }
});

const formProfile = document.forms.profile;
const userNameForm = formProfile.elements.userName;
const userJobForm = formProfile.elements.userJob;
const saveProfileButton = document.querySelector(".popup__button_save-profile");

// активность кнопки "сохранить"
formProfile.addEventListener('input', (event) => {
  if (userJobForm.value.length === 0 || userNameForm.value.length === 0) {
    saveProfileButton.setAttribute('disabled', true);
  } else {
    saveProfileButton.removeAttribute('disabled');
    saveProfileButton.classList.add('popup__button_active');
  }
});

const userNameProfile = document.querySelector('.user-info__name');
const userJobProfile = document.querySelector('.user-info__job');

//Авторизация пользователя
function authorizationUser() {
  api.getUserData()
    .then((res) => {
      userNameProfile.textContent = res.name;
      userJobProfile.textContent = res.about;
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
};

//загрузка карточек
function cardLoading() {
  api.getInitialCards()
    .then((result) => {
      cardlist.addCardsArr(result);
    })
    .catch((err) => {
      console.log(err);
    })
};

// редактирование профиля
function editProfile(event) {
  event.preventDefault();
  api.passUserName(userNameForm, userJobForm)
    .catch((err) => {
      saveProfileButton.textContent = err;
    })
    .finally(() => {
      authorizationUser();
      formProfile.reset();
      popupEditProfile.openForm();
    })
};

cardContain.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__image')) {
    cardlist.openCard();
    const popupImageItem = popupImage.querySelector('.card__image');
    popupImageItem.src = event.target.style.backgroundImage.slice(5, event.target.style.backgroundImage.length - 2);
  }
});

document.forms.imgPopup.addEventListener('submit', (event) => {
  event.preventDefault();
  cardlist.addCard(name.value, link.value);
  form.reset();
  popupAddImg.openForm();
});

form.addEventListener('input', (event) => {
  if (name.value.length === 0 || link.value.length === 0) {
    addCardButton.setAttribute('disabled', true);
  } else {
    addCardButton.removeAttribute('disabled');
    addCardButton.classList.add('popup__button_active');
  }
});

document.querySelector('.user-info__button').addEventListener('click', () => {
  popupAddImg.openForm();
});

document.querySelector('.user-info__edit').addEventListener('click', () => {
  popupEditProfile.openForm();
});

validityInput(userNameForm, '.error_userName');
validityInput(userJobForm, '.error_userJob');
validityInput(name, '.error_name');
authorizationUser();
cardLoading();
document.forms.profile.addEventListener('submit', editProfile);
