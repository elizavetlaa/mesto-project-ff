export function handlePopupClick(evt) {
  if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
    closePopup(evt.currentTarget);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}