import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createPost, deletePost, likePost, prevewPost } from "./blocks/components/card.js";
import { closePopup, handleEditFormSubmit, handleEditPopupOpen, handleAddPopupOpen } from "./blocks/components/modal.js";
import {
  editPopupElement,
  profileEditButton,
  popupCloseButton,
  editForm,
  cardAddButton,
  addForm,
  cardContainer,
  imageDescriptionInput,
  imageUrlInput,
  addPopupElement,
} from "./blocks/components/constants.js";

function renderInitialCards(cardsArr) {
  cardsArr.forEach(card => {
    const newPost = createPost(card, deletePost, likePost, prevewPost);
    cardContainer.append(newPost);
  });
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPost = createPost({ name: imageDescriptionInput.value, link: imageUrlInput.value }, deletePost, likePost, prevewPost);
  closePopup(addPopupElement);
  cardContainer.prepend(newPost);
  evt.target.reset();
}

profileEditButton.addEventListener("click", () => {
  handleEditPopupOpen();
});

popupCloseButton.addEventListener("click", () => {
  closePopup(editPopupElement);
});

editForm.addEventListener("submit", evt => {
  handleEditFormSubmit(evt);
});

cardAddButton.addEventListener("click", () => {
  handleAddPopupOpen();
});

addForm.addEventListener("submit", evt => {
  handleAddFormSubmit(evt);
});

renderInitialCards(initialCards);