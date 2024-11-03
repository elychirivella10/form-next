import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export const insertarAudiencia = async (data, usuario) => {
  const val ={
    ...data,
    nombre_contacto:usuario.nombre_contacto,
    apellido_contacto:usuario.apellido_contacto,
    correo_contacto:usuario.correo_contacto,
    telefono_contacto:usuario.telefono_contacto,
    identificacion_contacto:usuario.typeIdentification+usuario.identificacion_contacto,
  }
    try {
      const respuesta = await axios.post(`${rutaAxios2}requerimientos`, { ...val});
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
      throw new Error("Fallo al insertar los datos de la audiencia");
    }
  };