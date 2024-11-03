import axios from "axios";
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales";

export const insertarUsuario = async (data) => {
    const val ={
        nombre:data.nombre,
        apellido:data.apellido,
        correo:data.correo,
        identificacion:data.typeIdentification+data.identificacion,
        clave:data.clave,
        telefono:data.telefono,
        id_rol:data.id_rol
    }
    try {
        const respuesta = await axios.post(`${rutaAxios2}usuarios`, { ...val });
        return respuesta.data; // Devolvemos los datos de la respuesta exitosa
    } catch (error) {
        // Manejamos los errores según el objeto de error
        if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que no está en el rango de 2xx
        console.error(
            "La inserción del usuario falló con el código de estado:",
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
        throw new Error("Fallo al insertar los datos del usuario");
    }
};

export default insertarUsuario;