import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createPost, deletePost, likePost } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  profileTitle,
  profileDescription,
  nameInput,
  editPopupElement,
  profileEditButton,
  popupCloseButton,
  editForm,
  cardAddButton,
  addForm,
  cardContainer,
  descriptionInput,
  imageDescriptionInput,
  imageUrlInput,
  addPopupElement,
} from "./components/constants.js";

const popupImagePreview = document.querySelector(".popup_type_image");
const popupImage = popupImagePreview.querySelector(".popup__image");
const popupImageCaption = popupImagePreview.querySelector(".popup__caption");

function renderInitialCards(cardsArr) {
  cardsArr.forEach(card => {
    const newPost = createPost(card, deletePost, likePost, prevewPost);
    cardContainer.append(newPost);
  });
}

function prevewPost(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openPopup(popupImagePreview);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPost = createPost({ name: imageDescriptionInput.value, link: imageUrlInput.value }, deletePost, likePost, prevewPost);
  closePopup(addPopupElement);
  cardContainer.prepend(newPost);
  evt.target.reset();
}

function handleEditPopupOpen() {
  openPopup(editPopupElement);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopupElement);
}

function handleAddPopupOpen() {
  openPopup(addPopupElement);
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