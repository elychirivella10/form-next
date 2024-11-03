import {useState} from 'react'
import { validateNumber } from "@/lib/helpers/validate/validateNumber";
import { aloneLetter } from "@/lib/helpers/validate/validateForm";
import { validarEmpty } from "@/lib/helpers/validate/validateEmpty";
//Instancia de app de antd, para usar componentes si colocar manualmente la configuracion
import { App, Badge } from 'antd';

const UserInfo = ({insertRegister, register, insertStep}) => {
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();

    const [info, setInfo] = useState({
        typeIdentification:register.typeIdentification,
        identificacion_contacto:register.identificacion_contacto,
        nombre_contacto:register.nombre_contacto,
        apellido_contacto:register.apellido_contacto,
        telefono_contacto:register.telefono_contacto,
        correo_contacto:register.correo_contacto,
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
        const valid = validateNumber(e.target.value, 8, message)
        if (valid) {
            setInfo({
                ...info,
                [e.target.name]:e.target.value,
                clave:e.target.value
            })
        }
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="box animate__animated animate__fadeInRight animate__faster">
                <div className="columns is-centered is-multiline">
                    <div className="column is-4">
                        <label className="label">Nombre <span className='ml-1'><Badge status="error" size='small' /></span></label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="text" required placeholder="Nombre" name="nombre_contacto" value={info.nombre_contacto} onChange={handleText}/>
                        </div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Apellido <span className='ml-1'><Badge status="error" size='small' /></span></label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="text" required placeholder="Apellido" name="apellido_contacto" value={info.apellido_contacto} onChange={handleText}/>
                            <span className="icon is-small is-right">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Identificación <span className='ml-1'><Badge status="error" size='small' /></span></label>
                        <div className="field has-addons pb-4 mb-2">
                            <p className="control">
                                <span className="select">
                                <select name="typeIdentification" value={info.typeIdentification} onChange={(e)=>{
                                    setInfo({...info,[e.target.name]:e.target.value})
                                }}>
                                    <option value="V">V</option>
                                    <option value="E">E</option>
                                </select>
                                </span>
                            </p>
                            <p className="control is-expanded has-icons-right">
                                <input className="input" type="number" required name='identificacion_contacto' value={info.identificacion_contacto}  placeholder="Identificacion" maxLength={10} onChange={handleNumberIdentification}/>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-passport"></i>
                                </span>
                            </p>
                        </div>        
                    </div>
                    <div className="column is-6">
                        <label className="label">Correo Electrónico <span className='ml-1'><Badge status="error" size='small' /></span></label>
                        <div className="control has-icons-right pb-4">
                            <input className="input" type="email" required placeholder="Correo Electrónico" value={info.correo_contacto} name="correo_contacto" onChange={(e)=>(
                                setInfo({...info,[e.target.name]:e.target.value})
                            )}/>
                            <span className="icon is-small is-right">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="column is-6">
                        <label className="label">Teléfono <span className='ml-1'><Badge status="error" size='small' /></span></label>
                        <div className="control has-icons-right pb-4 mb-2">
                            <input className="input" type="number" required placeholder="Celular" value={info.telefono_contacto} onChange={handleNumberPhone} onKeyUp={(e)=>{
                            }} name="telefono_contacto"/>
                            <span className="icon is-small is-right">
                                <i className="fas fa-phone"></i>
                            </span>
                        </div>
                    </div>

                    <div className="column is-12">
                            <button className = "button is-fullwidth is-blue" onClick={(e)=>{

                                if (validarEmpty(info)) {
                                    
                                    insertStep(2)
                                    insertRegister({
                                        ...info
                                    })
                                }else{
                                    message.error('Por favor, rellene los campos obligatorios')
                                }
                            }}
                            >Siguiente</button>
                    </div>
                </div>    
            </div>
        </form>
    )
}

export default UserInfo