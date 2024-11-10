export function validarEmail(correo,  message) {
    // Expresión regular para validar correos electrónicos
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Verifica si la cadena coincide con el patrón
        // Validar que el valor solo contenga números
        regex.test(correo)
    if (!regex.test(correo)) {
        message.error('Ingrese un correo electrónico valido', 2)
        return false
    }
    return true;
  }
