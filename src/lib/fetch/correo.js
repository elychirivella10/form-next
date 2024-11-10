import axios from "axios"
import { rutaAxios } from "@/lib/helpers/axios/variablesGoblales"

export async function setCorreo(id) {
    const res = await axios.get(`${rutaAxios}correos/${id}/2`)
    const data = res.data
    return data
}