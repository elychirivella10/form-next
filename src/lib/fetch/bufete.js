import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export const insertarBufete = async (data) => {
  if (data.rif === "" || data.rif === null || data.nombre_bufete === "" || data.correo === "" || data.telefono === "") {
    return true
  }else{
    const val = {
      nombre_bufete: data.nombre_bufete,
      correo: data.correo,
      rif: data.typeIdentification+data.rif,
      telefono: data.telefono,
    }
    try {
      const respuesta = await axios.post(`${rutaAxios2}bufetes`, { ...val });
      return respuesta.data; // Devolvemos los datos de la respuesta exitosa
    } catch (error) {
      // Manejamos los errores según el objeto de error
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que no está en el rango de 2xx
        console.error(
          "La solicitud falló con el código de estado:",
          error.response.status
        );
        console.error("Datos de la respuesta de error:", error.response.data);
        // Maneja códigos de error específicos aquí (por ejemplo, 400 para solicitud inválida, 401 para no autorizado)
  
        // Opcionalmente, proporciona un mensaje de error amigable para el usuario o lógica de reintentos
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió ninguna respuesta
        // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en Node.js
        console.error("No se recibió ninguna respuesta del servidor:", error.request);
      } else {
        // Ocurrió algo al configurar la solicitud que provocó un error
        console.error("Error al configurar la solicitud:", error.message);
      }
  
      // Opcionalmente, lanza un error personalizado para un manejo posterior:
      throw new Error("Fallo al insertar los datos del bufete");
    }
  }
    
  };


  export const insertBufetesAudiencias = async (id_bufete, id_audiencia) => {
    console.log(id_bufete, id_audiencia)
    if (id_bufete === null || id_audiencia === null || id_bufete === undefined || id_audiencia === undefined) {
      return true
    }else{
      try {
        const respuesta = await axios.post(`${rutaAxios2}usuarios_bufetes`, { id_bufete, id_audiencia });
        return respuesta.data; // Devolvemos los datos de la respuesta exitosa
      } catch (error) {
        // Manejo de errores
        console.error('Error al insertar la relación bufete-audiencia:', error);
        // Puedes agregar aquí lógica adicional para manejar el error, como mostrar un mensaje al usuario, registrar el error, etc.
        throw error; // Reenviamos el error para que pueda ser capturado en niveles superiores
      }
    }
      
    }
