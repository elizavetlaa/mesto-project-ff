import { cardTemplate } from "./constants";
import { openPopup } from "./modal";

// @todo: Функция создания карточки
export function createPost(card, handlePostDelete, handlePostLike, handlePostPreview) {
  const postElement = cardTemplate.querySelector(".card").cloneNode(true);
  const postImage = postElement.querySelector(".card__image");
  const postTitle = postElement.querySelector(".card__title");
  const postDeleteButton = postElement.querySelector(".card__delete-button");
  const postLikeButton = postElement.querySelector(".card__like-button");

  postImage.src = card.link;
  postImage.alt = card.name;
  postTitle.textContent = card.name;

  postDeleteButton.addEventListener("click", handlePostDelete);
  postLikeButton.addEventListener("click", handlePostLike);
  postImage.addEventListener("click", handlePostPreview);

  return postElement;
}
// @todo: Функция удаления карточки
export function deletePost(evt) {
  evt.target.closest(".card").remove();
}

export function likePost(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function prevewPost(evt) {
  const popupImagePreview = document.querySelector(".popup_type_image");
  const popupImage = popupImagePreview.querySelector(".popup__image");
  const popupImageCaption = popupImagePreview.querySelector(".popup__caption");

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openPopup(popupImagePreview);
}