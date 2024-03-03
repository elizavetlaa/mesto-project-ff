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
  editAvatarButton,
  editAvatarPopup,
  editAvatarForm,
  avatarImage,
  avatarUrlInput
} from "./components/constants.js";

import {validationSettings, enableValidation, clearValidation}  from "./components/validation.js";
import {getInitialPosts, getPersonInfo, addPost, deletePost, editPersonInfo, addLike, deleteLike, updateAvatar} from "./components/api.js";

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
      evt.target.closest(".card").querySelector(".card__like-count").textContent = card.likes.length
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    addLike(evt.target.closest(".card").id)
    .then((card) => {
      evt.target.closest(".card").querySelector(".card__like-count").textContent = card.likes.length
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

function handleAddPopupOpen() {
  openPopup(addPopupElement);
}

function handleEditAvatarPopupOpen() {
  openPopup(editAvatarPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const addButton = addForm.querySelector(".popup__button");
  addButton.textContent = "Сохранить..."
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
      addButton.textContent = "Сохранить"
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  const editButton = editAvatarForm.querySelector(".popup__button");
  editButton.textContent = "Сохранить..."
  updateAvatar(avatarUrlInput.value)
    .then((avatar) => {
      avatarImage.style.backgroundImage = `url(${avatar.avatar})`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      editButton.textContent = "Сохранить"
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

  const editButton = editForm.querySelector(".popup__button");
  editButton.textContent = "Сохранить..."
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
      editButton.textContent = "Сохранить"
    });
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
})

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