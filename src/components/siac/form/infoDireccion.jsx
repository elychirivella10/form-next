import React, {useState, useEffect} from "react";

import { estados } from "./estados";
import { filterMun } from "./municipios";
import { filterPar } from "./parroquias";
import { validarEmpty } from "@/lib/helpers/validate/validateEmpty";
import alerta from "@/components/general/alert/Alert";
import { App } from "antd";


const InfoDireccion = ({insertStep, insertState, stateDir}) =>{
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();

    const [info, setInfo] = useState({
        "direccion":"No Aplica",
        "state":0,
        "county":0,
        "town":0
    })

    useEffect(() => {
        setInfo({
            ...stateDir
        })
    }, [stateDir])
    

    const [estadoss, setEstadoss] = useState([])
    const [municipios, setMunicipios] = useState([])

    const setEstado = (e) =>{
        const value = e.target.value
        const name = e.target.name
        setInfo({
            ...info,
            [name]:value
        })
    }
    const setMunicipio = (e) =>{
        const value = e.target.value
        const name = e.target.name
        const es =estadoss.filter(ex => ex.municipio == e.target.value)
        console.log(es)
        setInfo({
            ...info,
            [name]:value
        })
        setMunicipios(
            es[0].parroquias
        )
    }
    
    return(
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="box animate__animated animate__fadeInRight animate__faster	">
                <div className="columns is-centered is-multiline">
                    <div className="column is-6">
                        <div className="field pb-4 mb-2">
                            <label className="label">País</label>
                            <p className="control">
                                <input className="input" type="text" placeholder="País" value={"Republica Bolivariana de Venezuela"} name="pais" readOnly/>
                            </p>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field pb-4 mb-2">
                            <label className="label">Estado</label>
                            <p className="control">
                                <span className="select">
                                <select name="state" required onChange={setEstado} value={info.state}>
                                <option value="">---Seleccione un Estado---</option>
                                {
                                    estados.map((e)=>(
                                        <option key={e.estadoid} value={e.estadoid}>{e.estadonom}</option> 
                                    ))
                                }
                                </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field pb-4 mb-2">
                            <label className="label">Municipio</label>
                            <p className="control">
                                <span className="select">
                                <select name="county" onChange={setMunicipio} required value={info.county}>
                                <option value="">---Seleccione un Municipio</option>
                                {
                                    info.state>0? filterMun(info.state).map(e=>(
                                        <option key={e.municipioid} value={e.municipioid}>{e.municipionom}</option> 
                                    )):null
                                }

                                </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field pb-4 mb-2">
                            <label className="label">Parroquia</label>
                            <p className="control">
                                <span className="select" >
                                <select name="town" value={info.town} required onChange={(e)=>(
                                    setInfo({
                                        ...info,
                                        [e.target.name]:e.target.value
                                        })
                                    )}>
                                    <option value="">---Seleccione una Parroquia</option>
                                    {
                                    info.county>0?filterPar(info.county).map((e)=>(
                                        <option key={e.parroquiaid} value={e.parroquiaid}>{e.parroquianom}</option> 
                                    )):null
                                }
                                </select>
                                </span>
                            </p>
                        </div>
                    </div>

                    
                    <div className="column is-12">
                        <button className = "button is-fullwidth is-blue" onClick={(e)=>{
                            if (validarEmpty(info)) {
                                    
                                insertStep(3)
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
    )
}
export default InfoDireccion