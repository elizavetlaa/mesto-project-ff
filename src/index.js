import "./pages/index.css";
import { createPost, updateLikeCounter } from "./components/card.js";
import { handlePopupClick, openPopup, closePopup } from "./components/modal.js";
import { validationSettings, enableValidation, clearValidation }  from "./components/validation.js";

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
  editAvatarButton,
  editAvatarPopup,
  editAvatarForm,
  avatarImage,
  avatarUrlInput
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
      cards.forEach(card => {
        const newPost = createPost(card, personalInfo._id, deletePostHandler, likePostHandler, prevewPost);
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

function likePostHandler(evt) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(evt.target.closest(".card").id)
      .then((card) => {
        updateLikeCounter(evt, card)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(evt.target.closest(".card").id)
      .then((card) => {
        updateLikeCounter(evt, card)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  evt.target.classList.toggle("card__like-button_is-active");
}

function prevewPost(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openPopup(popupImagePreview);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const addButton = addForm.querySelector(".popup__button");
  updateSaveButtonState(true, addButton)
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
      updateSaveButtonState(true, addButton)
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  const editAvatarButton = editAvatarForm.querySelector(".popup__button");
  updateSaveButtonState(true, editAvatarButton)
  updateAvatar(avatarUrlInput.value)
    .then((avatar) => {
      avatarImage.style.backgroundImage = `url(${avatar.avatar})`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      updateSaveButtonState(true, editAvatarButton)
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const editButton = editForm.querySelector(".popup__button");
  updateSaveButtonState(true, editButton)
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
      updateSaveButtonState(false, editButton)
    });
}

function updateSaveButtonState(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить..."
  } else {
    button.textContent = "Сохранить"
  }
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

popupsArray.forEach((popup) => {
  popup.addEventListener("click", handlePopupClick);
});

enableValidation(validationSettings);

getPersonInfo()
  .then((personalInfo) => {
    profileTitle.textContent = personalInfo.name;
    profileDescription.textContent = personalInfo.about;
    avatarImage.style.backgroundImage = `url(${personalInfo.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

renderInitialCards();