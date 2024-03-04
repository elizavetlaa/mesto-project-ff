import "./pages/index.css";
import { createPost, updateLikeCounter, toggleCardLike } from "./components/card.js";
import { handlePopupClick, openPopup, closePopup } from "./components/modal.js";
import { validationSettings, enableValidation, clearValidation }  from "./components/validation.js";

import {
  profileTitle,
  profileDescription,
  nameInput,
  editPopupElement,
  profileEditButton,
  profileEditSubmitButton,
  popupsArray,
  editForm,
  cardAddButton,
  addForm,
  cardContainer,
  descriptionInput,
  imageDescriptionInput,
  imageUrlInput,
  addPopupElement,
  addSubmitButton,
  editAvatarButton,
  editAvatarPopup,
  editAvatarForm,
  avatarImage,
  avatarUrlInput,
  editAvatarSubmitButton
} from "./components/constants.js";

import {
  getInitialPosts,
  getPersonInfo,
  addPost,
  deletePost,
  editPersonInfo,
  addLike,
  deleteLike,
  updateAvatar
} from "./components/api.js";

const popupImagePreview = document.querySelector(".popup_type_image");
const popupImage = popupImagePreview.querySelector(".popup__image");
const popupImageCaption = popupImagePreview.querySelector(".popup__caption");

function renderInitialCards() {
  Promise.all([getInitialPosts(), getPersonInfo()])
    .then(([cards, personalInfo]) => {
      profileTitle.textContent = personalInfo.name;
      profileDescription.textContent = personalInfo.about;
      avatarImage.style.backgroundImage = `url(${personalInfo.avatar})`;

      cards.forEach(card => {
        const newPost = createPost(card, personalInfo._id, deletePostHandler, likePostHandler, prevewPost);
        cardContainer.append(newPost);
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

function deletePostHandler(postElement, cardId) {
  deletePost(cardId)
    .then(() => {
      postElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likePostHandler(isActive, cardId, postLikeButton, postLikeCountElement) {
  if (isActive) {
    deleteLike(cardId)
      .then((card) => {
        updateLikeCounter(postLikeCountElement, card.likes.length);
        toggleCardLike(postLikeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((card) => {
        updateLikeCounter(postLikeCountElement, card.likes.length);
        toggleCardLike(postLikeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function prevewPost(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openPopup(popupImagePreview);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  updateSaveButtonState(true, addSubmitButton)
  addPost(imageDescriptionInput.value, imageUrlInput.value)
    .then((newPost) => {
      const createdPost = createPost(newPost, newPost.owner._id, deletePostHandler, likePostHandler, prevewPost);
      cardContainer.prepend(createdPost);
      closePopup(addPopupElement);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateSaveButtonState(false, addSubmitButton)
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  updateSaveButtonState(true, editAvatarSubmitButton)
  updateAvatar(avatarUrlInput.value)
    .then((avatar) => {
      avatarImage.style.backgroundImage = `url(${avatar.avatar})`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      updateSaveButtonState(false, editAvatarSubmitButton)
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  updateSaveButtonState(true, profileEditSubmitButton)
  editPersonInfo(nameInput.value, descriptionInput.value)
    .then((newPersonInfo) => {
      profileTitle.textContent = newPersonInfo.name;
      profileDescription.textContent = newPersonInfo.about;
      closePopup(editPopupElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateSaveButtonState(false, profileEditSubmitButton)
    });
}

function updateSaveButtonState(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить..."
  } else {
    button.textContent = "Сохранить"
  }
}

function handleEditPopupOpen() {
  openPopup(editPopupElement);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editPopupElement, validationSettings)
}

function handleAddPopupOpen() {
  openPopup(addPopupElement);
}

function handleEditAvatarPopupOpen() {
  openPopup(editAvatarPopup);
}

profileEditButton.addEventListener("click", () => {
  handleEditPopupOpen();
});

cardAddButton.addEventListener("click", () => {
  handleAddPopupOpen();
});

editAvatarButton.addEventListener("click", () => {
  handleEditAvatarPopupOpen();
});

editForm.addEventListener("submit", evt => {
  handleEditFormSubmit(evt);
});

addForm.addEventListener("submit", evt => {
  handleAddFormSubmit(evt);
});

editAvatarForm.addEventListener("submit", evt => {
  handleEditAvatarFormSubmit(evt);
});

popupsArray.forEach((popup) => {
  popup.addEventListener("click", handlePopupClick);
});

enableValidation(validationSettings);

renderInitialCards();