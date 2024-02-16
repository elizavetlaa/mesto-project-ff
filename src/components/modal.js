function handleEscButton(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function handlePopupClick(evt) {
  if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
    closePopup(evt.currentTarget);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscButton);
  popup.addEventListener("click", handlePopupClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscButton);
  popup.removeEventListener("click", handlePopupClick);
}