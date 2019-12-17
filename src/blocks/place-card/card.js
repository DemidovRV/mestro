

//Класс карточки картинки
export class Card {
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
