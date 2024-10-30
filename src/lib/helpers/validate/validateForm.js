export const aloneLetter = (e, message) => {
    const value = e.target.value;
    const previousValue = e.target.previousValue;
    const isLettersOnly = /^[a-zA-ZñÑ ]+$/.test(value);
    if (value==="") {
        return true
    }
    if ((!isLettersOnly && value !== previousValue)) {
      message.error('Este campo no acepta números ni caracteres especiales', 1);
      e.target.value = previousValue;
      return false;
    } else {
      return true;
    }
};