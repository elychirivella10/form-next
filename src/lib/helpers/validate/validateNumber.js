export function validateNumber(valor, maximoCaracteres, message, min=null, campo = null) {
   // Expresión regular para solo números
   const regexSoloNumeros = /^[0-9]+$/;
 
   // Validar que el valor no sea vacío
   if (!valor) {
     return "El valor no puede ser vacío";
   }
 
   // Validar que el valor solo contenga números
   if (!regexSoloNumeros.test(valor)) {
      message.error('Este campo solo puede contener números', 1)
      return false
   }
 
   // Validar que el valor no supere el máximo de caracteres
   if (valor.length > maximoCaracteres) {
      message.error('Este campo no puede tener mas de'+' '+maximoCaracteres+' '+'caracteres', 1)
      return false
   }
   if (valor.length < min && min !==null) {
      message.error(`El campo ${campo} no puede ser menor a`+' '+min+' '+'caracteres', 1)
      return false
   }
 
   // Si todas las validaciones son correctas, retornar true
   return true;
 }