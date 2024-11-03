import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export async function paises() {
    const res = await axios.get(`${rutaAxios2}paises`)
    const data = res.data
    return data
}