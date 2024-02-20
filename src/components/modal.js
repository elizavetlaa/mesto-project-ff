export function handlePopupClick(evt) {
  if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
    closePopup(evt.currentTarget);
  }
}

function handdlePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handdlePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handdlePopupEsc);
}