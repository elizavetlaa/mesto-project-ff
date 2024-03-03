const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: '9e8d7f6c-9aca-4a04-92ad-ee57900cb43d',
      'Content-Type': 'application/json'
    }
 }

 const request = (url, method, body) => {
    return fetch(url, {
        method: method,
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const getInitialPosts = () => {
    return request(`${config.baseUrl}/cards`, 'GET')
}

export const addPost = (name, link) => {
    return request(`${config.baseUrl}/cards`, 'POST', {
        name,
        link
    })
}

export const deletePost = (cardId) => {
    return request(`${config.baseUrl}/cards/${cardId}`, 'DELETE')
}

export const addLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, 'PUT')
}

export const deleteLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, 'DELETE')
}

export const getPersonInfo = () => {
    return request(`${config.baseUrl}/users/me`, 'GET') 
}

export const editPersonInfo = (name, about) => {
    return request(`${config.baseUrl}/users/me`, 'PATCH', {
        name: name,
        about: about
    });
}

export const updateAvatar = (avatar) => {
    return request(`${config.baseUrl}/users/me/avatar`, 'PATCH', {
        avatar: avatar
    }) 
}