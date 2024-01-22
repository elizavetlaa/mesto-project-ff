// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createPost(card, handlePostDelete) {
    const postElement = cardTemplate.querySelector(".card").cloneNode(true);
    const postImage = postElement.querySelector(".card__image");
    const postTitle = postElement.querySelector(".card__title");
    const postDeleteButton = postElement.querySelector(".card__delete-button");

    postImage.src = card.link;
    postImage.alt = card.name;
    postTitle.textContent = card.name;

    postDeleteButton.addEventListener("click", handlePostDelete);

    return postElement;
}
// @todo: Функция удаления карточки
function deletePost(evt) {
    evt.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
function renderInitialCards(cardsArr) {
  cardsArr.forEach(card => {
    const newPost = createPost(card, deletePost);
    cardContainer.append(newPost);
  });

}

renderInitialCards(initialCards);