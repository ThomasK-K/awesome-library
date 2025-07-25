// Input Field Validation
// eslint-disable-next-line no-useless-escape
const isEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const isRequired = (val: string | number): boolean => {
  if (val === '') return false;
  else return true;
};
const isPhone = (phone: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\d{10}$/; // Beispiel: 10-stellige Nummer
  return regex.test(phone);
};
const isDecimal = (phone: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\d{1,},\d{1,2}$/; // Beispiel: 
  return regex.test(phone);
};
const isURL = (url: string): boolean => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(url);
};
const isStrongPassword = (password: string): boolean => {
  // Mindestens 8 Zeichen, ein Großbuchstabe, ein Sonderzeichen
  // eslint-disable-next-line no-useless-escape
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  return regex.test(password);
};
/* eslint-enable no-useless-escape */
const isNumeric = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};
//////////////////////////////////////////////////////////////
const myValidator = {
  isEmail,
  isRequired,
  isNumeric,
  isPhone,
  isDecimal,
  isStrongPassword,
  isURL,
};
////////////////////////////////////////////////////////////
export const handleValidation = (
  value: string|number,
  validation: { required?: boolean; type?: string } = {}
) => {
  let errMessage = '';
  if (validation) {
    if (validation.required) {
      if (!myValidator.isRequired(value)) {
        return 'Field is required';
      }
    } 
    switch (validation.type) {
      case 'email':
        if (!myValidator.isEmail(value as string)) errMessage = 'Field is not an Email';
        break;
      case 'password':
        if (!myValidator.isStrongPassword(value as string)) errMessage = 'Password does  not an match';
        break;
      case 'phone':
        if (!myValidator.isPhone(value as string)) errMessage = 'entry is not a phone number';
        break;
      case 'decimal':
        if (!myValidator.isDecimal(value as string)) errMessage = 'entry is not a decimal number';
        break;
      case 'url':
        if (!myValidator.isURL(value as string)) errMessage = 'entry is not a Url';
        break;
      case 'ipAdress':
        if (!myValidator.isURL(value as string)) errMessage = 'entry is not a Url';
        break;
      case 'numeric':
        if (!myValidator.isNumeric(value as string)) errMessage = 'entry is not a number';
        break;
      default:
        break;
    }
  }
  return errMessage;
};
