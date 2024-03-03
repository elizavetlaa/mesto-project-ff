export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export function enableValidation(validationSettings) {
    const formElementAll = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formElementAll.forEach((formElement) => {
        setEventListeners(formElement, validationSettings);
    });
}

export function clearValidation(formElement, validationSettings) {
    const formInputArray = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    formInputArray.forEach((inputElement) => { hideInputError(formElement, inputElement, validationSettings) });
}

const setEventListeners = (formElement, validationSettings) => {
    const formInputArray = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    
    toggleButtonState(formInputArray, buttonElement, validationSettings);
    
    formElement.addEventListener('reset', () =>
        disableButton(buttonElement, validationSettings)
    );

    formInputArray.forEach((input) => {
        input.addEventListener("input", () => {
            isValid(formElement, input, validationSettings);
            toggleButtonState(formInputArray, buttonElement, validationSettings);
        });
    });
}

const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationSettings);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

const disableButton = (buttonElement, validationSettings) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationSettings.inactiveButtonClass);
};
