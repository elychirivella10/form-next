import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export async function categorias() {
    const res = await axios.get(`${rutaAxios2}categorias/1`)
    const data = res.data
    return data
}