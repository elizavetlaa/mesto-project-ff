import "./pages/index.css";
import { createPost, likePost } from "./components/card.js";
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
import {getInitialPosts, getPersonInfo, addPost, deletePost, editPersonInfo} from "./components/api.js";

const popupImagePreview = document.querySelector(".popup_type_image");
const popupImage = popupImagePreview.querySelector(".popup__image");
const popupImageCaption = popupImagePreview.querySelector(".popup__caption");

function renderInitialCards() {
  Promise.all([getInitialPosts(), getPersonInfo()])
    .then(([cards, personalInfo]) => {
      cards.forEach(card => {
        const newPost = createPost(card, personalInfo._id, deletePostHandler, likePost, prevewPost);
        cardContainer.append(newPost);
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

function deletePostHandler(evt) {
  deletePost(evt.target.closest(".card").id);
  evt.target.closest(".card").remove();
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

  editPersonInfo(nameInput.value, descriptionInput.value)
    .then((newPersonInfo) => {
      profileTitle.textContent = newPersonInfo.name;
      profileDescription.textContent = newPersonInfo.about;
      closePopup(editPopupElement);
    })
    .catch((err) => {
      console.log(err);
    });
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

getPersonInfo()
  .then((personalInfo) => {
    profileTitle.textContent = personalInfo.name;
    profileDescription.textContent = personalInfo.about;
  })
  .catch((err) => {
    console.log(err);
  });

renderInitialCards();