export class Api {
    constructor(options) {
      this.options = options;    
    }
  
    getInitialCards() {
      return fetch(`${this.options.baseUrl}/cards`, { 
        headers: this.options.headers
      })
      .then((res) => {
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

  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';

  export const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: 'f1c92919-670b-4e03-af61-0e003923fc00',
      'Content-Type': 'application/json'
    }
  });