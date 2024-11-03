import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export async function municipios(id) {
    const res = await axios.get(`${rutaAxios2}municipios/byEstado/${id}`)
    const data = res.data
    return data
}