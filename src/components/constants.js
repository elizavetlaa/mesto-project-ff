const cardContainer = document.querySelector(".places__list");

// модальные окна
const editPopupElement = document.querySelector(".popup_type_edit");
const addPopupElement = document.querySelector(".popup_type_new-card");

// редактирование профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.forms.namedItem("edit-profile");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");

//добавление карточки
const cardAddButton = document.querySelector(".profile__add-button");
const imageUrlInput = document.querySelector(".popup__input_type_url");
const imageDescriptionInput = document.querySelector(".popup__input_type_card-name");
const addForm = document.forms.namedItem("new-place");

export {
  cardContainer,
  editPopupElement,
  addPopupElement,
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput,
  profileEditButton,
  editForm,
  cardAddButton,
  imageUrlInput,
  imageDescriptionInput,
  addForm,
};