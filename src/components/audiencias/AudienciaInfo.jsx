import { useState, useEffect } from "react"
import { paises } from "@/lib/fetch/pais"
import { estados } from "@/lib/fetch/estados"
import { municipios } from "@/lib/fetch/municipios"
import { parroquias } from "@/lib/fetch/parroquias"
import { validarEmpty } from "@/lib/helpers/validate/validateEmpty"
import { Badge, App } from 'antd';

const AudienciaInfo = ({insertAudiencia, audiencia, insertStep}) =>{
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();
    const [info, setInfo] = useState({
        id_formato_cita:audiencia.id_formato_cita,
        id_estado:1,
        id_pais:audiencia.id_pais,
        id_estado_pais:audiencia.id_estado_pais,
        id_municipio:audiencia.id_municipio,
        id_parroquia:audiencia.id_parroquia,
        id_trabajador:audiencia.id_trabajador,
        id_area:audiencia.id_area,
        id_usuario:1,
    })

    const [listPaises, insertListPaises] = useState([])
    const [listEstadosPais, insertListEstadosPais] = useState([])
    const [listMunicipios, insertListMunicipios] = useState([])
    const [listParroquias, insertListParroquias] = useState([])

    const insertTypeAudiencia = (e) =>{
        const id_trabajador = e.target.value==1?35:36
        setInfo({
            ...info,
            [e.target.name]:e.target.value,
            ['id_trabajador']: id_trabajador
        })
    }

    const insertEstadoPais = (e) =>{
        const estado = e.target.value
        setInfo({
            ...info,
            [e.target.name]:estado,
        })
        municipios(estado).then(res=>{
            insertListMunicipios(res.municipioss)
        })
    }
    const insertMunicipio = (e) =>{
        const municipio = e.target.value
        setInfo({
            ...info,
            [e.target.name]:municipio,
        })
        parroquias(municipio).then(res=>{
            insertListParroquias(res.parroquiass)
        })
    }

    useEffect(() => {
        paises().then(res=>{
            insertListPaises(res.paisess)
        })
        estados().then(res=>{
            insertListEstadosPais(res.estados_paisess)
        })
    }, [])

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="box animate__animated animate__fadeInRight animate__faster">
                <div className="columns is-centered is-multiline">
                    <div className="column is-6">
                        <div className="field">
                            <label className="label">Tipo de audiencia <span className='ml-1'><Badge status="error" size='small' /></span></label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_area" id="id_area" value={info.id_area} required onChange={insertTypeAudiencia}>
                                        <option value={0}>---Seleccione un tipo de audiencia---</option>
                                        <option value={1}>Marcas</option>
                                        <option value={2}>Patentes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field">
                            <label className="label">Formato Cita <span className='ml-1'><Badge status="error" size='small' /></span></label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_formato_cita" value={info.id_formato_cita} required onChange={(e)=>{
                                        setInfo({...info,[e.target.name]:e.target.value})
                                        
                                    }}>
                                        <option value={0}>---Seleccione un Formato---</option>
                                        <option value={1}>Presencial</option>
                                        <option value={2}>Virtual</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="column is-6">
                        <div className="field">
                            <label className="label">Pais <span className='ml-1'><Badge status="error" size='small' /></span></label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_pais" required value={info.id_pais} onChange={(e)=>{
                                        setInfo({...info,[e.target.name]:e.target.value})
                                    }}>
                                        <option value={0}>---Seleccione un pais---</option>
                                        {listPaises.map((p, index) =>(
                                        <option value={p.id} key={index} >{p.pais}</option>  
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="column is-6 ">
                        <div className="field">
                            <label className="label">Estado <span className='ml-1'><Badge status="error" size='small' /></span></label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_estado_pais" onChange={insertEstadoPais}>
                                        <option value={0} >---Seleccione un estado---</option>
                                        {info.id_pais == 95?
                                            listEstadosPais.map((e, index)=>(
                                                <option  key={index} value={e.id}>{e.estado_pais}</option>
                                            ))
                                        :null}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field">
                            <label className="label">Municipio </label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_municipio" onChange={insertMunicipio}>
                                        <option value={0} >---Seleccione un municipio---</option>
                                        {
                                            listMunicipios.map((e, index)=>(
                                                <option  key={index} value={e.id}>{e.municipio}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field">
                            <label className="label">Parroquia </label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_parroquia" onChange={(e)=>{
                                        setInfo({...info,[e.target.name]:e.target.value})
                                    }}>
                                        <option value={0} >---Seleccione un parroquia---</option>
                                        {
                                            listParroquias.map((e, index)=>(
                                                <option  key={index} value={e.id}>{e.parroquia}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-12">
                            <button className = "button is-fullwidth is-blue" onClick={(e)=>{
                                let exceptiones = []
                                if (info.id_pais !== "95") {
                                    exceptiones= ["id_estado_pais","id_municipio", "id_parroquia"]
                                }
                                if (validarEmpty(info, [...exceptiones])) {
                                    
                                    insertStep(4)
                                    insertAudiencia({
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

export default AudienciaInfo