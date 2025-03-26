// Input Field Validation

const isEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const isRequired = (val: string | number): boolean => {
  if (val === "") return false;
  else return true;
};
const isPhone = (phone: string): boolean => {
  const regex = /^\d{10}$/; // Beispiel: 10-stellige Nummer
  return regex.test(phone);
};

const isURL = (url: string): boolean => {
  const regex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(url);
};
const isStrongPassword = (password: string): boolean => {
  // Mindestens 8 Zeichen, ein Großbuchstabe, ein Sonderzeichen
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  return regex.test(password);
};
const isNumeric = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};
//////////////////////////////////////////////////////////////
const myValidator = {
  isEmail,
  isRequired,
  isNumeric,
  isPhone,
  isStrongPassword,
  isURL,
};
////////////////////////////////////////////////////////////
export const handleValidation = (
  value: string,
  validation: { required?: boolean; type?: string } = {}
) => {
  let errMessage = "";
  if (validation) {
    if (validation.required) {
      if (!myValidator.isRequired(value)) {
        return "Field is required";
      }
    }
    switch (validation.type) {
      case "email":
        if (!myValidator.isEmail(value)) errMessage = "Field is not an Email";
        break;
      case "password":
        if (!myValidator.isStrongPassword(value))
          errMessage = "Password does  not an match";
        break;
      case "phone":
        if (!myValidator.isPhone(value))
          errMessage = "entry is not a phone number";
        break;
      case "url":
        if (!myValidator.isURL(value)) errMessage = "entry is not a Url";
        break;
      case "ipAdress":
        if (!myValidator.isURL(value)) errMessage = "entry is not a Url";
        break;
      case "numeric":
        if (!myValidator.isNumeric(value)) errMessage = "entry is not a number";
        break;
      default:
        break;
    }
  }
  return errMessage;
};
