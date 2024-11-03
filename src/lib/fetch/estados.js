import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export async function estados() {
    const res = await axios.get(`${rutaAxios2}estados_paises`)
    const data = res.data
    return data
}