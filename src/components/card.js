const cardTemplate = document.querySelector("#card-template").content;

export function createPost(card, personId, handlePostDelete, handlePostLike, handlePostPreview) {
  const postElement = cardTemplate.querySelector(".card").cloneNode(true);
  const postImage = postElement.querySelector(".card__image");
  const postTitle = postElement.querySelector(".card__title");
  const postDeleteButton = postElement.querySelector(".card__delete-button");
  const postLikeButton = postElement.querySelector(".card__like-button");

  postImage.src = card.link;
  postImage.alt = card.name;
  postTitle.textContent = card.name;

  postElement.id = card._id;

  if (card.likes.some((like) => like._id === personId)) {
    postLikeButton.classList.toggle("card__like-button_is-active");
  }
  if(card.owner._id === personId) {
    postDeleteButton.classList.toggle("card__delete-button-visible")
  }

  postDeleteButton.addEventListener("click", handlePostDelete);
  postLikeButton.addEventListener("click", handlePostLike);
  postImage.addEventListener("click", handlePostPreview);

  return postElement;
}

export function likePost(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}