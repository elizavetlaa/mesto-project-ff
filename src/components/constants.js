const cardContainer = document.querySelector(".places__list");

// модальные окна
const editPopupElement = document.querySelector(".popup_type_edit");
const addPopupElement = document.querySelector(".popup_type_new-card");
const popupsArray = Array.from(document.querySelectorAll(".popup"));

// редактирование профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.forms.namedItem("edit-profile");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditSubmitButton = editForm.querySelector(".popup__button");

//добавление карточки
const cardAddButton = document.querySelector(".profile__add-button");
const imageUrlInput = document.querySelector(".popup__input_type_url");
const imageDescriptionInput = document.querySelector(".popup__input_type_card-name");
const addForm = document.forms.namedItem("new-place");
const addSubmitButton = addForm.querySelector(".popup__button");

// редактирование аватара
const editAvatarButton = document.querySelector(".profile__avatar-edit-button");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarUrlInput = document.querySelector(".popup__input_new_avatar_url");
const editAvatarForm = document.forms.namedItem("avatar");
const editAvatarSubmitButton = editAvatarForm.querySelector(".popup__button");
const avatarImage = document.querySelector(".profile__image");


export {
  cardContainer,
  editPopupElement,
  addPopupElement,
  popupsArray,
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput,
  profileEditButton,
  profileEditSubmitButton,
  editForm,
  cardAddButton,
  imageUrlInput,
  imageDescriptionInput,
  addForm,
  addSubmitButton,
  editAvatarButton,
  editAvatarForm,
  editAvatarPopup,
  avatarImage,
  avatarUrlInput,
  editAvatarSubmitButton
};