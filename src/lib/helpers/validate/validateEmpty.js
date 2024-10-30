export const validarEmpty = (object) => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            if ((object[key] === "" || object[key] == 0) && object[key] !==false) {
                return false
            }
        }
    }
    return true
}