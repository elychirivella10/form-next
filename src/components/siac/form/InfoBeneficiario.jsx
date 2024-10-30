import React, {useState, useEffect} from "react";
import Buscar from "./Buscar";
import { validarEmpty } from "@/lib/helpers/validate/validateEmpty";
import moment from "moment";
//Instancia de app de antd, para usar componentes si colocar manualmente la configuracion
import { App } from 'antd';
import { validateNumber } from "@/lib/helpers/validate/validateNumber";
import { aloneLetter } from "@/lib/helpers/validate/validateForm";


const InfoBeneficiario = ({insertStep, insertState, stateBef}) =>{

    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();

    const [info, setInfo] = useState({
        "date-entry":moment().format('YYYY-MM-DD'),
        "person-id":"",
        "person-name":"",
        "person-lastname":"",
        "telephone":"",
        "nacionalidad":"V",
        "idusuopr":19,
        "edad":"",
        "fecha-nacimiento":"",
        "profesion":"",
        "sexo":0,
        "tipo-atencion-usu":0,
        "pi-type":1,
        "ente_adscrito":1,
        "bandera_denuncia":false,
        "bandera_cgr":false,
        "tipo_beneficiario":1, 
        "correo":"",
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
    const handleNumberAge = (e) =>{
        const valid = validateNumber(e.target.value, 3, message)
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
                [e.target.name]:e.target.value
            })
        }
    }

    useEffect(() => {
        setInfo({
            ...stateBef
        })
    }, [stateBef])
    
    
    return(
        <React.Fragment>

            <Buscar state={info} setState={setInfo}/>
            <form onSubmit={(e)=>{
                                e.preventDefault()
                            }}>
                <div className="box animate__animated animate__fadeInRight animate__faster">
                    <div className="columns is-centered is-multiline">
                        <div className="column is-4">
                            <label className="label">Nombre</label>
                            <div className="control has-icons-right pb-4 is-expanded">
                                <input className="input" type="text" required placeholder="Nombre" value={info["person-name"]} name="person-name" onChange={handleText}/>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="column is-4">
                            <label className="label">Apellido</label>
                            <div className="control has-icons-right pb-4 is-expanded">
                                <input className="input" type="text" placeholder="Apellido" name="person-lastname" required value={info["person-lastname"]} onChange={handleText}/>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="column is-4">
                                <label className="label">Identificación</label>
                                <div className="field has-addons pb-4 mb-2">
                                <p className="control">
                                    <span className="select">
                                    <select name="nacionalidad" value={info["nacionalidad"]} required onChange={(e)=>(
                                    setInfo({
                                        ...info,
                                        [e.target.name]:e.target.value
                                    })
                                )}>
                                        <option value="V">V</option>
                                        <option value="E">E</option>
                                        <option value="J">J</option>
                                        <option value="G">G</option>
                                    </select>
                                    </span>
                                </p>
                                <p className="control is-expanded has-icons-right">
                                    <input className="input" type="text" placeholder="Identificación" maxLength={10} required name="person-id" value={info["person-id"]} onChange={handleNumberIdentification}/>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-passport"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field pb-4 mb-2">
                                <label className="label">Género</label>
                                <p className="control">
                                    <span className="select">
                                    <select name="sexo" value={info.sexo} required onChange={(e)=>(
                                    setInfo({
                                            ...info,
                                            [e.target.name]:e.target.value
                                        })
                                    )}>
                                        <option value="">---Seleccione una Género</option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Femenino</option>
                                    </select>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="column is-6">
                                <div className="field pb-4 mb-2">
                                    <label className="label">Tipo de Descripción</label>
                                    <p className="control">
                                        <span className="select" name="id_tipo_atencion">
                                        <select name="tipo-atencion-usu" required value={info["tipo-atencion-usu"]}onChange={(e)=>{
                                            const banderaDe =  e.target.value==5? true:null
                                            
                                            setInfo({
                                                ...info,
                                                [e.target.name]:e.target.value,
                                                "bandera_denuncia":banderaDe
                                            })
                                        }} >
                                            <option value="">---Seleccione una Descripción</option>
                                            <option value="2">Sugerencia</option>
                                            <option value="3">Queja</option>
                                            <option value="4">Reclamo</option>
                                            <option value="5">Denuncia</option>
                                            <option value="6">Petición</option>
                                        </select>
                                        </span>
                                    </p>
                                </div>
                        </div>
                        <div className="column is-6">
                                <label className="label">Teléfono</label>
                                <div className="control has-icons-right pb-4 mb-2">
                                    <input className="input" type="text" placeholder="0412019912" required value={info["telephone"]} name="telephone" onChange={handleNumberPhone} />
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-phone"></i>
                                    </span>
                                </div>
                        </div>
                        <div className="column is-6">
                                <label className="label">Correo</label>
                                <div className="control has-icons-right pb-4">
                                    <input className="input" type="email" placeholder="Correo" required name="correo" value={info["correo"]} onChange={(e)=>(
                                    setInfo({
                                        ...info,
                                        [e.target.name]:e.target.value
                                    })
                                )}/>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                        </div>
                        <div className="column is-4">
                                <label className="label">Edad</label>
                                <div className="control has-icons-right pb-4 mb-2">
                                    <input className="input" type="text" placeholder="Edad" required value={info["edad"]} name="edad" onChange={handleNumberAge} />
                                    <span className="icon is-small is-right">
                                        <i className="fa-solid fa-9"></i>
                                    </span>
                                </div>
                        </div>
                        <div className="column is-4">
                                <label className="label">Fecha de Nacimiento</label>
                                <div className="control has-icons-right pb-4 mb-2">
                                    <input className="input" type="date" placeholder="Fecha de Nacimiento" required value={info["fecha-nacimiento"]} name="fecha-nacimiento"  onChange={(e)=>(
                                    setInfo({
                                        ...info,
                                        [e.target.name]:e.target.value
                                    })
                                )} />
                                    <span className="icon is-small is-right">
                                        <i className="fa-solid fa-calendar"></i>
                                    </span>
                                </div>
                        </div>
                        <div className="column is-4">
                                <label className="label">Profesión</label>
                                <div className="control has-icons-right pb-4 mb-2">
                                    <input className="input" type="text" placeholder="Profesión" required value={info["profesion"]} name="profesion" onChange={handleText} />
                                    <span className="icon is-small is-right">
                                        <i className="fa-solid fa-briefcase"></i>
                                    </span>
                                </div>
                        </div>
                        <div className="column is-12">
                            <button className = "button is-fullwidth is-blue" onClick={(e)=>{
                                if (validarEmpty(info)) {
                                    
                                    insertStep(2)
                                    insertState({
                                        ...info
                                    })
                                }
                            }}
                            >Siguiente</button>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}   
export default InfoBeneficiario