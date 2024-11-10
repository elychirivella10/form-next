export const validarEmpty = (object, excepciones = []) => {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        // Check if the key is in the exceptions array
        if (!excepciones.includes(key)) {
          if ((object[key] === "" || object[key] == 0) && object[key] !== false) {
            return false;
          }
        }
      }
    }
    return true;
  };