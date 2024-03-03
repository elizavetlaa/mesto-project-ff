const cardTemplate = document.querySelector("#card-template").content;

export function createPost(card, personId, handlePostDelete, handlePostLike, handlePostPreview) {
  const postElement = cardTemplate.querySelector(".card").cloneNode(true);
  const postImage = postElement.querySelector(".card__image");
  const postTitle = postElement.querySelector(".card__title");
  const postDeleteButton = postElement.querySelector(".card__delete-button");
  const postLikeButton = postElement.querySelector(".card__like-button");
  const postLikeCountElement = postElement.querySelector(".card__like-count");

  postImage.src = card.link;
  postImage.alt = card.name;
  postTitle.textContent = card.name;

  const isLiked = card.likes.some((like) => like._id === personId)

  if (isLiked) {
    toggleCardLike(postLikeButton)
  }
  if(card.owner._id === personId) {
    postDeleteButton.classList.add("card__delete-button-visible")
  }
  postLikeCountElement.textContent = card.likes.length;

  postDeleteButton.addEventListener("click", () => handlePostDelete(postElement, card._id));
  postLikeButton.addEventListener("click", () => handlePostLike(
    postLikeButton.classList.contains("card__like-button_is-active"), card._id, postLikeButton, postLikeCountElement)
  );
  postImage.addEventListener("click", handlePostPreview);

  return postElement;
}

export function updateLikeCounter(postLikeCountElement, count) {
  postLikeCountElement.textContent = count;
}

export function toggleCardLike(postLikeButton) {
  postLikeButton.classList.toggle("card__like-button_is-active");
}