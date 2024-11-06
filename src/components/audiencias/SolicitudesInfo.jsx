/* este archivo le falta acomodarlo, hacer mejor el codigo y mas lejible
agregar initialState
funciones para items de descripcion */

import { useState, useEffect } from "react"
import { obtenerSoli } from "@/lib/fetch/solicitudes";
import { categorias } from "@/lib/fetch/categorias";
//Instancia de app de antd, para usar componentes si colocar manualmente la configuracion
import { App, Descriptions, Space, Badge } from 'antd';
import {initialStateSolicitud} from './initialStates/solicitud'
import TableComp from '@/components/general/table/Tabla'

const SolicitudesInfo = ({insertSolicitudes, solicitudes, insertStep, audiencia, deleteR, insertAudienciaWeb}) =>{
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();
    const [state, insertState] = useState({
        num_solicitud:"",
        num_registro:0,
        id_requerimiento:0,
        id_trabajador:audiencia.id_trabajador,
        id_categoria:0,
        descripcion:""
    })
    const [solicitud, setSolicitud] = useState({
        ano:"",
        sol:""
    })

    const [sipi, insertSipi] = useState({})

    const [listCategorias, insertListCategorias] = useState([])

    const getRequest =async(e)=>{       
        obtenerSoli(audiencia.id_area, setSolicitud, solicitud, message).then(res=>(
            insertSipi({...res})
        )).catch(error=>(
            console.log(error)
        ))
    }

    const items = [
        {
          key: '1',
          label: 'Nombre Solicitud',
          children: sipi.nombre!==""?sipi.nombre:"N/A",
        },
        {
          key: '2',
          label: 'Nombre Titular',
          children: sipi.titulares?sipi.titulares[0].nombre:'N/A',
        },
        {
            key: '3',
            label: 'Numero Poder',
            children: sipi.poder!==""?sipi.poder:'N/A',
        }
    ];

    useEffect(() => {
        categorias().then(res=>{
            insertListCategorias(res.categorias)
        })
    }, [])

    const insertRequest=(e)=>{
        const {categoria, descripcion} = state
        if (categoria == 0 || descripcion ==="" || solicitud.ano+solicitud.sol ==="") {
            return message.error('Debe ingresar los campos *Categoria*, *Descripción* y *Solicitud*',2)
        }else{
            state.deleteR = deleteR
            insertSolicitudes([
                ...solicitudes,
                {
                    ...state,
                    ['num_solicitud']:solicitud.ano+solicitud.sol,
                    ['num_registro']:sipi.registro,
                    ['nombre']:sipi.nombre
                }
            ])
    
            insertState({...initialStateSolicitud, id_trabajador:audiencia.id_trabajador})
            setSolicitud({
                ano:"",
                sol:""
            })
        }
    }  


    const columns = [
        {
        title:'Nombre Solicitud',
        dataIndex:'nombre'
        },
        {
        title:'Numero de registro',
        dataIndex:'num_registro'
        },
        {
        title:'Numero de solicitud',
        dataIndex:'num_solicitud'
        },
        {
        title:'Descripción',
        dataIndex:'descripcion'
        },
        {
        key: 'action',
        render: (_, record) => {
            return(
            <Space size="middle">
                <button class="button is-primary is-light" onClick={()=>(deleteR(record.num_solicitud))}>Eliminar</button>
            </Space> 
            )

            
        },
        }
    ];

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="box animate__animated animate__fadeInRight animate__faster">
                <div className="columns is-centered is-multiline">
                    <div className="column is-10"> 
                        <div className="field mb-3">
                            <label className="label">Numero Solicitud <span className='ml-1'><Badge status="error" size='small' /></span></label>
                            <div className="field-body">
                                <div className="field has-addons" >
                                    <div className="control">
                                        <input className="input" type="text" maxLength="4" name="ano" value={solicitud.ano} onChange={(e)=>{
                                            setSolicitud({
                                                ...solicitud,
                                                [e.target.name]:e.target.value
                                            })
                                        }}/>
                                    </div> 
                                    <div className="control ml-3">
                                        <p>-</p>
                                    </div> 
                                    <div className="control ml-3">
                                        <input className="input" type="text" name="sol" value={solicitud.sol} maxLength="6" onChange={(e)=>{
                                            setSolicitud({
                                                ...solicitud,
                                                [e.target.name]:e.target.value
                                            })
                                        }}/>
                                    </div> 
                                    <div className="control">
                                        <button className="button is-info" onClick={getRequest}>
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-2">
                        <figure className="image is-96x96">
                        {
                            sipi.solicitud?
                                <img src={`http://172.16.0.30/graficos/${audiencia.id_area==1?'marcas':'patentes'}/${audiencia.id_area==1?'ef':'di'}${solicitud.ano}/${solicitud.ano+solicitud.sol}.jpg`} alt=""/>
                            :null  
                        } 
                        </figure>
                    </div>
                    <div className="column is-12">
                        <Descriptions title="Información Solicitud" layout="vertical" items={items} />
                    </div>
                    <div className="column is-12">
                        <div className="field">
                        <label className="label">Categoria <span className='ml-1'><Badge status="error" size='small' /></span></label>
                            <div className="control">
                                <div className="select">
                                    <select  name="id_categoria"  value={state.id_categoria} onChange={(e)=>(
                                        insertState({
                                            ...state,
                                            [e.target.name]:e.target.value
                                        })
                                    )}>
                                        <option value={0} >{'---Seleccione una categoria---'}</option>
                                    {listCategorias.map((c, index)=>(
                                        c.id_departamento == audiencia.id_area?
                                        <option value={c.id} key={index} >{c.categoria}</option>
                                    :null))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-12">
                        <div className="field">
                            <div className="control">
                                <p className=" has-text-weight-semibold mb-5">Descripcion <span className='ml-1'><Badge status="error" size='small' /></span></p>
                                <textarea className="textarea" value={state.descripcion} name="descripcion" onChange={(e)=>(
                                    insertState({
                                        ...state,
                                        [e.target.name]:e.target.value
                                    })
                                )} ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="column is-12">
                        <button className="button is-primary is-fullwidth" onClick={insertRequest}>Agregar Solicitud</button>
                    </div>
                </div>
            </div>
            <div className="box animate__animated animate__fadeInRight animate__faster">
                <div className="columns is-centered is-multiline">
                    <div className="column is-12">
                        <TableComp  data={solicitudes} columns={columns}/>
                    </div>
                    <div className="column is-12">
                        <button className="button is-primary is-fullwidth" onClick={insertAudienciaWeb}>Registrar Audiencia</button>
                    </div>
                </div>
            </div>

                    
                
        </form>
    )
}

export default SolicitudesInfo  