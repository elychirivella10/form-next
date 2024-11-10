import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"
import { errors } from "../helpers/errors/errorApi"
import { padLeft } from "@/lib/helpers/letter/pad";

export async function obtenerSoli(id_area, setSolicitud, solicitud, message) {
    const { ano, sol } = solicitud;
    const soliPad = padLeft(sol, 0, 6);
    const val = ano + soliPad;
    const tipo = id_area === '1' ? 'M' : 'P';

    setSolicitud({
        ...solicitud,
        "sol": soliPad
    });

    try {
        const response = await axios.get(`${rutaAxios2}solicitudes/consulta/${val}/${tipo}`);
        const data = response.data;
        data.categoria -= 1000;

        return data;
    } catch (error) {
        message.error(error.response.data.error.message, 1);
    }
}



  export const insertarSolicitud = async (requests, id) => {
    const vals = requests
    try {
      // Update each request's id_requerimiento directly within the loop for efficiency
      vals.forEach(val => {val.id_requerimiento = id; delete val.nombre});
  
      const response = await axios.post(`${rutaAxios2}solicitudes`, vals);
  
      if (response.data.id_solicitudes) {
        return true; // Explicitly return success for better control flow
      } else {
        throw new Error("Unexpected response from server: missing id_solicitudes");
      }
    } catch (error) {
        message.error(error.response.data.error.message, 1)
        return false;
    }
  };
