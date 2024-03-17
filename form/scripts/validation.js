class Validator {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.errorsStorage = {};

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!this.hasErrors) {
        this.form.submit();
      }
    });
  }

  get hasErrors() {
    return Object.keys(this.errorsStorage).length > 0;
  }

  addValidatingRule(selector, check) {
    const inputElement = this.form.querySelector(selector);
    const errorElement = inputElement
      .closest(".main__input-container")
      .querySelector(".main__error");

    const executeRule = (event, hideErrors) => {
      const { pass, errorMessage } = check(inputElement.value, event);

      if (!pass) {
        this.errorsStorage[inputElement] = true;
        inputElement.classList.remove("correct");
        inputElement.classList.add("incorrect");
      } else {
        delete this.errorsStorage[inputElement];
        inputElement.classList.remove("incorrect");
        inputElement.classList.add("correct");
      }

      if (!hideErrors) {
        errorElement.textContent = errorMessage || "";
      } else {
        inputElement.classList.remove("correct");
        inputElement.classList.remove("incorrect");
      }
    };

    inputElement.addEventListener("blur", (event) => executeRule(event));
    executeRule(null, true);
  }
}

const validator = new Validator(".main__form");

function validateEmail(value) {
  const validEmailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!value.match(validEmailRegexp)) {
    return {
      pass: false,
      errorMessage: "Sorry, it doesn't look like email",
    };
  }

  return {
    pass: true,
  };
}

function validatePasswordFormat(value) {
  const requirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  let errorsMessage = `Password must contain at least: `;

  if (!value.match(requirements)) {
    const lowercaseLetters = /[a-z]/g;
    if (!value.match(lowercaseLetters)) {
      errorsMessage += `- 1 lowercase letter `;
    }

    const uppercaseLetters = /[A-Z]/g;
    if (!value.match(uppercaseLetters)) {
      errorsMessage += `- 1 uppercase letter `;
    }

    const numbers = /[0-9]/g;
    if (!value.match(numbers)) {
      errorsMessage += `- 1 number `;
    }

    if (value.length < 8) {
      errorsMessage += `- 8 characters`;
    }

    return {
      pass: false,
      errorMessage: errorsMessage,
    };
  }

  return {
    pass: true,
  };
}

function validatePasswordMatch(value) {
  const firstPassword = document.getElementById("password");

  if (value !== firstPassword.value) {
    return {
      pass: false,
      errorMessage: "Sorry, passwords don't match, please try to confirm again",
    };
  }

  return {
    pass: true,
  };
}

function validateDate(value) {
  const yearFirstFormat = /^\d{4}-\d{2}-\d{2}$/;
  const dayFirstFormat = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/;
  const dayFirstSlashFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (
    !value.match(yearFirstFormat) &&
    !value.match(dayFirstFormat) &&
    !value.match(dayFirstSlashFormat)
  ) {
    return {
      pass: false,
      errorMessage:
        "Date should be in format: YYYY-MM-DD, DD-MM-YYYY or DD/MM/YYYY",
    };
  }

  return {
    pass: true,
  };
}

function validateRequired(value, event) {
  if (!value) {
    if (event) event.stopImmediatePropagation();
    return {
      pass: false,
      errorMessage: "This input field cannot be empty",
    };
  }

  return {
    pass: true,
  };
}

validator.addValidatingRule("#first-name", validateRequired);
validator.addValidatingRule("#last-name", validateRequired);
validator.addValidatingRule("#email", validateRequired);
validator.addValidatingRule("#password", validateRequired);
validator.addValidatingRule("#confirm-password", validateRequired);
validator.addValidatingRule("#age", validateDate);
validator.addValidatingRule("#email", validateEmail);
validator.addValidatingRule("#password", validatePasswordFormat);
validator.addValidatingRule("#confirm-password", validatePasswordMatch);

window.validator = validator;
