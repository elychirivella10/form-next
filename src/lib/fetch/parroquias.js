import axios from "axios"
import { rutaAxios2 } from "@/lib/helpers/axios/variablesGoblales"

export async function parroquias(id) {
    const res = await axios.get(`${rutaAxios2}parroquias/byMunicipio/${id}`)
    const data = res.data
    return data
}