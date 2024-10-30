'use client'
import {useState} from "react"
import axios from "axios";
import { rutaAxios } from "@/lib/helpers/axios/variablesGoblales";
import alerta from "@/components/general/alert/Alert";

const Buscar =({state, setState})=>{
    const [per, setPer] = useState({
        "person-id":0,
        "person-name":"",
        "person-lastname":"",
        "telephone":"",
        "nacionalidad":"V",
        "sexo":0,
        "tipo_beneficiario":1, 
        "correo":"",
    })

    const [inde, setInde] = useState(0)
    const search = (e) =>{
        axios.get(`http://localhost:80/public/Informacion_Usu/27038431`)
        .then(respuesta=>{
            const data = respuesta.data
            if (respuesta.data.length>0) {
                setState({
                    ...state,
                    "person-id":data[0].casoced,
                    "person-name":data[0].casonom,
                    "person-lastname":data[0].casoape,
                    "telephone":data[0].casotel,
                    "nacionalidad":data[0].nacionalidad,
                    "sexo":data[0].sexo, 
                    "correo":data[0].correo,
                })
                alerta.open({type:"success", message:'Datos cargados correctamente'})
            }else{
                alerta.open({type:"warning", message:'No se han encontrado datos con el numero de identificación'})
            }

        })
/*         if (inde === 0) {
           return alerta.open({type:"error", message:'ingrese un numero de identificacion valido'})
        }
        if (pe.length>0) {
            alerta.open({type:"success", message:'Se ha cargado la informacion del usuario'})
            setPer(pe[0])
        }else{
            alerta.open({type:"error", message:'No se ha encontrado al usuario, verifique el numero de indentificacion'})
        } */
        
    }
    return(
        <div className="box box animate__animated animate__fadeInRight animate__faster">
            <div className="columns">
                <div className="column is-4">
                <div className="field mb-3">
                        <label className="label">Cédula</label>
                        <div className="field-body">
                            <div className="field has-addons" >
                                <div className="control">
                                    <div className="select">
                                        <select  name="letra">
                                        <option value="V">V</option>
                                        <option value="E">E</option>
                                        </select>
                                    </div>
                                </div> 

                                <p className="control is-expanded has-icons-right">
                                    <input className="input" type="number"   placeholder="Cédula" maxLength={10}  onChange={(e)=>(
                                    setInde(e.target.value) 
                                    )}/>
                                </p> 
                                <div className="control">
                                    <button className="button is-info" onClick={search}>
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Buscar