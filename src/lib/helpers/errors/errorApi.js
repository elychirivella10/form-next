import { capiLetter } from "../letter/letter"

export const errors = (response, alert) =>{
    let errors = ''
    console.log(response)
    const campos = response.data.error.details
    if (response.status== 422) {
        for (let index = 0; index < campos.length; index++) {
            errors = capiLetter(campos[index].field.slice(1,-1))+ ', ' +errors
            
        }
        return  alert.open({type:"error", message:response.data.error.message + ' ' + errors})
    }else{
        return  alert.open({type:"error", message:response.data.error.message + ' ' + errors})
    }
}