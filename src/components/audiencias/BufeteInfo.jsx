import { useState } from "react"
import { validateNumber } from "@/lib/helpers/validate/validateNumber";
import { validarEmail } from "@/lib/helpers/validate/validateEmail";
import { aloneLetter } from "@/lib/helpers/validate/validateForm";
import { Alert } from 'antd';
//Instancia de app de antd, para usar componentes si colocar manualmente la configuracion
import { App } from 'antd';

const BufeteInfo = ({insertBufetes, bufetes, insertStep}) =>{
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();
    const [info, setInfo] = useState({
        nombre_bufete:bufetes.nombre_bufete,
        correo:bufetes.correo,
        rif:bufetes.rif,
        telefono:bufetes.telefono,
        typeIdentification:'J',
    })

    const handleText = async (e) =>{
        const  valid = aloneLetter(e, message)
        if (valid) {
            setInfo({
                ...info,
                [e.target.name]:e.target.value
            })
        }
        
    }
    
    const handleNumberPhone = (e) =>{
        const valid = validateNumber(e.target.value, 11, message)
        if (valid) {
            setInfo({
                ...info,
                [e.target.name]:e.target.value
            })
        }
    }

    const handleNumberIdentification= (e) =>{
        const valid = validateNumber(e.target.value, 10, message)
        if (valid) {
            setInfo({
                ...info,
                [e.target.name]:e.target.value,
            })
        }
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="box animate__animated animate__fadeInRight animate__faster">  
                <div className="is-fixed top-2 left-2">
                    <Alert
                        message="Información de Bufete"
                        description="Esta informacion no es obligatoria, si no pertenece a un bufete, puede omitirla"
                        type="info"
                        showIcon
                        closable
                    />  
                </div>
                <div className="columns is-centered is-multiline">
                    <div className="column is-6">
                        <label className="label">Nombre Bufete</label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="text" placeholder="Nombre" name="nombre_bufete" value={info.nombre_bufete} onChange={handleText}/>
                        </div>
                    </div>
                    <div className="column is-6">
                            <label className="label">RIF</label>
                            <div className="field has-addons pb-4 mb-2">
                                <p className="control">
                                    <span className="select">
                                    <select name="typeIdentification" value={info.typeIdentification} onChange={(e)=>{
                                        setInfo({...info,[e.target.name]:e.target.value})
                                    }}>
                                        <option value="J">J</option>
                                        <option value="G">G</option>
                                    </select>
                                    </span>
                                </p>
                                <p className="control is-expanded has-icons-right">
                                    <input className="input" type="number" name='rif' value={info.rif}  placeholder="Identificacion" maxLength={10} onChange={handleNumberIdentification}/>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-passport"></i>
                                    </span>
                                </p>
                            </div>        
                        </div>
                    <div className="column is-6">
                        <label className="label">Correo Electrónico</label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="email" placeholder="Correo Electrónico" name="correo" value={info.correo} onChange={(e)=>(
                                setInfo({...info,[e.target.name]:e.target.value})
                            )}/>
                            <span className="icon is-small is-right">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="column is-6">
                        <label className="label">Teléfono</label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="number" placeholder="Teléfono" name="telefono" value={info.telefono} onChange={handleNumberPhone} onKeyUp={(e)=>{
                            }} />
                            <span className="icon is-small is-right">
                                <i className="fas fa-phone"></i>
                            </span>
                        </div>
                    </div>
                    <div className="column is-12">
                        <button className = "button is-fullwidth is-blue" onClick={(e)=>{
                        if (info.rif !== "" && info.rif !== null && info.nombre_bufete !== "" && info.correo !== "" && info.telefono !== null) {
                            if (validateNumber(info.rif, 10, message, 6, "RIF") && validarEmail(info.correo, message) && validateNumber(info.telefono, 11, message, 6, "Teléfono")) {
                                insertStep(3)
                                insertBufetes({
                                    ...info
                                })
                            }
                        } else{
                            insertStep(3)
                            insertBufetes({
                                ...info
                            })
                        }
                            
                        }}
                        >{info.rif === "" || info.rif === null || info.nombre_bufete === "" || info.correo === "" || info.telefono === null ?'Omitir':"Siguiente"}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BufeteInfo