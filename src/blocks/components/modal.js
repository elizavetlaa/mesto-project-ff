import { editPopupElement, nameInput, descriptionInput, profileTitle, profileDescription, addPopupElement } from "./constants";

function handleEscButton(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function handlePopupClick(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscButton);
  document.addEventListener("click", handlePopupClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscButton);
  document.removeEventListener("click", handlePopupClick);
}

export function handleEditPopupOpen() {
  openPopup(editPopupElement);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopupElement);
}

export function handleAddPopupOpen() {
  openPopup(addPopupElement);
}