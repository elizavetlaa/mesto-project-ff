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
    formInputArray.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.remove(validationSettings.inputErrorClass);
        errorElement.classList.remove(validationSettings.errorClass);
        errorElement.textContent = "";
      });
}

const setEventListeners = (formElement, validation) => {
    const formInputArray = Array.from(formElement.querySelectorAll(validation.inputSelector));
    const buttonElement = formElement.querySelector(validation.submitButtonSelector);
    
    toggleButtonState(formInputArray, buttonElement);
    
    formElement.addEventListener('reset', () =>
        disableButton(buttonElement)
    );

    formInputArray.forEach((input) => {
        input.addEventListener("input", () => {
            isValid(formElement, input);
            toggleButtonState(formInputArray, buttonElement);
        });
    });
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
}; 
  
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement);
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

  const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  };
