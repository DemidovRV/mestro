/* <script src="./popups.js"></script>
  <script src="./cards.js"></script>
  <script src="./validity.js"></script>
  <script src="./server.js"></script> */

const formProfile = document.forms.profile;
const userNameForm = formProfile.elements.userName;
const userJobForm = formProfile.elements.userJob;
const userNameProfile = document.querySelector('.user-info__name');
const userJobProfile = document.querySelector('.user-info__job');
const saveProfileButton = document.querySelector(".popup__button_save-profile");
// Класс
class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.popup.querySelector('.popup__close').addEventListener('click', this.closePopup);
  }

  closePopup(event){   //метод закрытия попапа
    event.target.parentElement.parentElement.classList.remove('popup_is-opened');
  };

  openForm(){   //метод открытия popup 
    this.popup.classList.toggle('popup_is-opened');
  }
}


//Переменные
const popupAddImg = new Popup('.popup__add-img');
const popupEditProfile = new Popup('.popup__edit-profile');

document.querySelector('.user-info__button').addEventListener('click', function(){    
  popupAddImg.openForm()
}); 

document.querySelector('.user-info__edit').addEventListener('click', function() {    
  popupEditProfile.openForm();
});



const cardContain = document.querySelector('.places-list');

//Класс карточки картинки
class Card {
  constructor(name, link) {
    this.cardElement = this.createCard(name, link);
    this.cardElement
        .querySelector('.place-card__like-icon')
        .addEventListener('click', this.like);
    this.cardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove);
  }

  createCard(nameValue, linkValue) { 
    const cardContainer = document.createElement('div');
    const linkElement = document.createElement('div');
    const deleteElement = document.createElement('button');
    const descriptionElement = document.createElement('div');
    const nameElement = document.createElement('h3');
    const likeElement = document.createElement('button');
    
    cardContainer.classList.add('place-card');    
    linkElement.classList.add('place-card__image');
    linkElement.style.backgroundImage = `url(${linkValue})`;      
    deleteElement.classList.add('place-card__delete-icon');
    descriptionElement.classList.add('place-card__description');
    nameElement.classList.add('place-card__name');
    nameElement.textContent = nameValue;
    likeElement.classList.add('place-card__like-icon'); 
    
    linkElement.appendChild(deleteElement);
    descriptionElement.appendChild(nameElement);
    descriptionElement.appendChild(likeElement);
    cardContainer.appendChild(linkElement);  
    cardContainer.appendChild(descriptionElement);
    return cardContainer;
  }

  remove(event) {   // удаление картинки
  event.target.parentElement.parentElement.remove();
  }

  like(event) {  // like картинки
    event.target.classList.toggle('place-card__like-icon_liked');
  }
};

const popupImage = document.querySelector('.card'); 

// класс списка картинок
class CardList {
constructor(container) {
  this.container = container;
  this.cards =[];    
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
  }}
};

const cardlist = new CardList(document.querySelector('.places-list'));
const popupWindow = document.querySelector('.popup__add-img');
const form = document.forms.imgPopup;
const name = form.elements.name;
const link = form.elements.link;

//функция создания новой карточки картинки
function addCardNew(event) {
  event.preventDefault(); 
  cardlist.addCard(name.value, link.value)
  form.reset();
  popupAddImg.openForm()
};

cardContain.addEventListener('click', function (event) {  
  if (event.target.classList.contains('place-card__image')) { 
    cardlist.openCard();
    const popupImageItem = popupImage.querySelector('.card__image');
    popupImageItem.src = event.target.style.backgroundImage.slice(5, event.target.style.backgroundImage.length - 2);
  }
 });

document.forms.imgPopup.addEventListener( 'submit', function(event) {
  event.preventDefault(); 
  cardlist.addCard(name.value, link.value)
  form.reset();
  popupAddImg.openForm()
});

 
const addCardButton = popupWindow.querySelector('.popup__button');


//функция проверки валидности input текста
function validityInput(inputName, spanErrorSelector) { 
    inputName.addEventListener("input", function (event) {  
    let errorSpan = document.querySelector(spanErrorSelector);  
  if (inputName.validity.valueMissing) {
    errorSpan.textContent = 'Это обязательное поле'; 
    } else if (inputName.validity.tooShort) {
      errorSpan.textContent = 'Должно быть от 4 до 30 символов';
    } else {
      errorSpan.textContent = '';
    };
  })
};

//проверка валидноси ссылки
link.addEventListener("input", function (event) {  
let errorSpan = document.querySelector('.error_link');
if (link.validity.valueMissing) {
  errorSpan.textContent = 'Это обязательное поле'; 
  } else if (link.validity.typeMismatch) {
  errorSpan.textContent = 'Здесь должна быть ссылка';
  } else {
  errorSpan.textContent = '';
  };
});

//активнсть кнопки "+"
form.addEventListener('input', function (event) { 
  if (name.value.length === 0 || link.value.length === 0) {
    addCardButton.setAttribute('disabled', true);    
  } else {
    addCardButton.removeAttribute('disabled');
    addCardButton.classList.add('popup__button_active');
  }
});

// активность кнопки "сохранить"
formProfile.addEventListener('input', function (event) { 
 if (userJobForm.value.length === 0 || userNameForm.value.length === 0) {
  saveProfileButton.setAttribute('disabled', true);
 } else {
   saveProfileButton.removeAttribute('disabled');
   saveProfileButton.classList.add('popup__button_active');
 }});

validityInput(userNameForm, '.error_userName');
validityInput(userJobForm,  '.error_userJob');
validityInput(name,  '.error_name');



class Api {
    constructor(options) {
      this.options = options;    
    }
  
    getInitialCards() {
      return fetch(`${this.options.baseUrl}/cards`, { 
        headers: this.options.headers
      })
      .then((res) => {
        /* Можно лучше: так как проверка есть во всех запросах её можно вынести в отдельный метод чтобы не дублировать */
        if (res.ok) {
          return res.json();      
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })  
    }
  
    passUserName(userNameForm, userJobForm) {
      return fetch(`${this.options.baseUrl}/users/me`,  { 
        method: 'PATCH',       
        headers: this.options.headers      
      ,
        body: JSON.stringify({
            name: userNameForm.value,
            about: userJobForm.value
        })      
      })
      .then((res) => {
        if (res.ok) {
          return res.json();      
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
    }
  
    getUserData() {    
       return fetch(`${this.options.baseUrl}/users/me`, { 
        headers: this.options.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();      
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })  
    }
  };
    
  const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort4',
    headers: {
      authorization: 'f1c92919-670b-4e03-af61-0e003923fc00',
      'Content-Type': 'application/json'
    }
  });
  
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
       });
  };
  
    //загрузка карточек
  function cardLoading() {    
    api.getInitialCards() 
      .then((result) => {
        cardlist.addCardsArr(result)
      })
      .catch((err) => {
        console.log(err);       
      });
  };
  
  // редактирование профиля
  function editProfile(event) {
    event.preventDefault(); 
    api.passUserName(userNameForm, userJobForm)
      .catch((err) => {
        saveProfileButton.textContent = err;
      })
      .finally(() => {
        authorizationUser()
        formProfile.reset();   
        popupEditProfile.openForm(); 
      });
  };
  
  authorizationUser();
  cardLoading();
  document.forms.profile.addEventListener( 'submit',  editProfile);