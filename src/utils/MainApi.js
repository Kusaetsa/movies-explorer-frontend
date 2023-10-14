class MainApi {
  constructor(config) {
    this._url = config.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  handleLikeMovie(card, token) {
      return fetch(`${this._url}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: new URL(card.image.url, 'https://api.nomoreparties.co').toString(),
          trailerLink: card.trailerLink,
          thumbnail: new URL(card.image.url, 'https://api.nomoreparties.co').toString(),
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
        })
      })
        .then(
          this._checkResponse
        )
    }

    handleDisikeMovie(card, token) {
      return fetch(`${this._url}/movies/${card._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        }
      })
        .then(
          this._checkResponse
        )
    } 

    getUserInfo(token) {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        }
      })
        .then(
          this._checkResponse
        ) 
    }

    updateUserInfo(data, token) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      })
        .then(
          this._checkResponse
        )
  
    }

    getSavedMovies(token) {
      return fetch(`${this._url}/movies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        }
      })
        .then(
          this._checkResponse
        ) 
    }
  

}

const mainApi = new MainApi({
  url: 'http://localhost:3001',
})

export default mainApi;

