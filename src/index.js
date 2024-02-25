import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createPost, deletePost, likePost } from "./components/card.js";
import { handlePopupClick, openPopup, closePopup } from "./components/modal.js";
import {
  profileTitle,
  profileDescription,
  nameInput,
  editPopupElement,
  profileEditButton,
  popupsArray,
  editForm,
  cardAddButton,
  addForm,
  cardContainer,
  descriptionInput,
  imageDescriptionInput,
  imageUrlInput,
  addPopupElement,
} from "./components/constants.js";

import {validationSettings, enableValidation, clearValidation}  from "./components/validation.js";
import {getInitialPosts, getPersonInfo, addPost} from "./components/api.js";

const popupImagePreview = document.querySelector(".popup_type_image");
const popupImage = popupImagePreview.querySelector(".popup__image");
const popupImageCaption = popupImagePreview.querySelector(".popup__caption");

function renderInitialCards(cardsArr) {
  Promise.all([getInitialPosts(), getPersonInfo()])
    .then(([cards, personalInfo]) => {
      cards.forEach(card => {
        const newPost = createPost(card, personalInfo._id, deletePost, likePost, prevewPost);
        cardContainer.append(newPost);
      })
    })
    .catch((err) => {
      console.log(err);
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

  addPost(imageDescriptionInput.value, imageUrlInput.value)
    .then((newPost) => {
      const createdPost = createPost(card, newPost.owner._id, deletePost, likePost, prevewPost);
      cardContainer.append(createdPost);
      closePopup(addPopupElement);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditPopupOpen() {
  openPopup(editPopupElement);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editPopupElement, validationSettings)
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

popupsArray.forEach((popup) => {
  popup.addEventListener("click", handlePopupClick);
});

cardAddButton.addEventListener("click", () => {
  handleAddPopupOpen();
});

editForm.addEventListener("submit", evt => {
  handleEditFormSubmit(evt);
});

addForm.addEventListener("submit", evt => {
  handleAddFormSubmit(evt);
});

enableValidation(validationSettings); 

renderInitialCards(initialCards);