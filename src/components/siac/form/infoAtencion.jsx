import React, {Fragment, useState} from "react";
import Calendar from "@/components/general/calendar/CalendarDate";
import NoteFile from "@/components/siac/files/NotesFile"
import { rutaAxios } from "@/lib/helpers/axios/variablesGoblales";
//Instancia de app de antd, para usar componentes si colocar manualmente la configuracion
import { App } from 'antd';
import { errors } from "@/lib/helpers/errors/errorApi";
import { validarEmpty } from "@/lib/helpers/validate/validateEmpty";
import alerta from "@/components/general/alert/Alert";
import $ from "jquery";
import moment from "moment";
import axios from "axios";



const InfoAtencion=({insertStep, insertState, stateDir, stateBef, insertStateDir, insertStateBef })=>{
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();

    const [tipo, setTipo] = useState(0)
    const [info, setInfo] = useState({
        "office":2,
        "user-requirement":"",
        "social_network":3,
    })

    const [denuncia, setDenuncia] = useState({
        "option_personal":false,
        "option_comunidad":false,
        "option_terceros":false,
        "fecha_hechos":"",
        "denu_involucrados":"",
        "nombre_instancia":"",
        "rif_instancia":"",
        "ente_financiador":"",
        "nombre_proyecto":"",
        "monto_aprovado":0
    })

    const [fecha_hechos, setFecha] = useState("")

    const [involucrados, setInvolucrados] = useState(0)

    const [files, setFiles] = useState([

    ])

    const enviarArchivo = async (e) => {
        setFiles([
            ...files
        ])
    };

    const afectados = (e)=>{
        const val =e.target.value
        
        switch (val) {
            case "1":
                setDenuncia({
                    ...denuncia,
                    "option_personal":true,
                    "option_comunidad":false,
                    "option_terceros":false
                })
                break;
            case "2":
                setDenuncia({
                    ...denuncia,
                    "option_personal":false,
                    "option_comunidad":true,
                    "option_terceros":false
                })
                break;
            case "3":
                setDenuncia({
                    ...denuncia,
                    "option_personal":false,
                    "option_comunidad":false,
                    "option_terceros":true
                })
                break;
        
            default:
                break;
        }
    }

    const enviarForm = () =>{
        let data = {}

        if (stateBef.bandera_denuncia == true) {
            data = {
                ...info,
                ...stateBef,
                ...denuncia,
                fecha_hechos,
                ...stateDir
            }
        }else{
            data = {
                ...info,
                ...stateBef,
                ...stateDir
            }
        }
 
         $.ajax({
            method: "POST",
            url: `${rutaAxios}registrarCaso`,
            headers:{
                'Authorization': '34a698892c5aea5d5683176ce5256b8c'
            },
            data: {"data":data}
          }).then(respuesta=>{
                const data =JSON.parse(respuesta)
                if (data.idcaso) {
                    axios.get(`${rutaAxios}correos/${data.idcaso}/1`)
                    insertStateDir({
                        "direccion":"No aplica",
                        "state":0,
                        "county":0,
                        "town":0
                    })
                    insertStateBef({
                        "date-entry":moment().format('YYYY-MM-DD'),
                        "person-id":"",
                        "person-name":"",
                        "person-lastname":"",
                        "telephone":"",
                        "nacionalidad":"V",
                        "idusuopr":19,
                        "sexo":0,
                        "tipo-atencion-usu":0,
                        "pi-type":1,
                        "ente_adscrito":1,
                        "bandera_denuncia":false,
                        "bandera_cgr":false,
                        "tipo_beneficiario":1, 
                        "correo":""
                    })
                    alerta.open({type:"success", message:'Se ha agregado el caso correctamente'})
                    if (files.length>0) {
                        var formData = new FormData()
                        files.map(f=>{
                            formData.append("archivo", f.originFileObj)
                            formData.append("id_caso_pdf", data.idcaso)
                            $.ajax({
                                method: "POST",
                                url: `${rutaAxios}archivos`,
                                processData: false,
                                contentType: false,
                                headers:{
                                    'Authorization': '34a698892c5aea5d5683176ce5256b8c'
                                },
                                data: formData
                              }); // Agrega el archivo al objeto FormData
                        }).then(respuesta=>{
                            
                        })
                    }  
                }
                
            
        }).catch(function (error) {
            errors(error.response, alerta)
        })
         
        
          
    }
    return(
            <form onSubmit={(e)=>{
                e.preventDefault()
            }}>
                <div className="box animate__animated animate__fadeInRight animate__faster	">
                    <div className="columns is-centered is-multiline">
                        {
                            stateBef["bandera_denuncia"] == true?
                            <React.Fragment>
                                
                                    <div className="column is-4">
                                        <label className="label">A quien afecta el hecho:</label>
                                        <p className="control">
                                                <span className="select">
                                                <select name="incolucrados" required onChange={afectados} >
                                                    <option value="">---Seleccione un afectado---</option>
                                                    <option value="1">Personal</option>
                                                    <option value="2">Comunidad</option>
                                                    <option value="2">Terceros</option>

                                                </select>
                                                </span>
                                            </p>
                                    </div>
                                    
                                    <div className="column is-8">
                                    <label className="label">Fecha de los hechos:</label>
                                        <div className="control">
                                            <Calendar name = {"fecha_hechos"} getDate={setFecha}/>
                                        </div>
                                    </div>
                                    
                                    <div className="column is-12">
                                        <div className="field pb-4 mb-2">
                                            <label className="label">Existen Personas, Organismos o Instituciones Involucradas en los hechos</label>
                                            <p className="control">
                                                <span className="select">
                                                <select name="incolucrados" required onChange={(e)=>(
                                                    setInvolucrados(e.target.value)
                                                )} >
                                                    <option></option>
                                                    <option value="1">Si</option>
                                                    <option value="2">No</option>

                                                </select>
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {involucrados ==1?
                                        <React.Fragment> 
                                            <div className="column is-12">
                                                <div className="control">
                                                    <label className="label">Indique a los involucrados:</label>
                                                    <textarea className="textarea" required name="denu_involucrados" vale={denuncia.denu_involucrados}  onChange={(e)=>(
                                                        setDenuncia({
                                                            ...denuncia,
                                                            [e.target.name]:e.target.value
                                                        })
                                                    )}></textarea>
                                                </div>
                                            </div>
                                            <div className="column is-4">
                                                <label className="label">Nombre de la instancia del Poder Popular</label>
                                                <div className="control has-icons-right pb-4 mb-2">
                                                    <input className="input" type="text" required placeholder="Nombre" name="nombre_instancia" value={denuncia.nombre_instancia} onChange={(e)=>(
                                                        setDenuncia({
                                                            ...denuncia,
                                                            [e.target.name]:e.target.value
                                                        })
                                                    )}/>
                                                </div>
                                            </div>
                                            <div className="column is-4">
                                                <label className="label">Rif</label>
                                                <div className="control has-icons-right pb-4 mb-2">
                                                    <input className="input" type="text" placeholder="Rif" name="rif_instancia" value={denuncia.rif_instancia} onChange={(e)=>(
                                                        setDenuncia({
                                                            ...denuncia,
                                                            [e.target.name]:e.target.value
                                                        })
                                                    )} required />
                                                </div>
                                            </div>
                                            <div className="column is-4">
                                                <label className="label">Ente Financiador</label>
                                                <div className="control has-icons-right pb-4 mb-2">
                                                    <input className="input" type="text" placeholder="Ente Financiador" name="ente_financiador" value={denuncia.ente_financiador} onChange={(e)=>(
                                                        setDenuncia({
                                                            ...denuncia,
                                                            [e.target.name]:e.target.value
                                                        })
                                                    )} required />
                                                </div>
                                            </div>
                                            <div className="column is-6">
                                                <label className="label">Nombre del Proyecto</label>
                                                <div className="control has-icons-right pb-4 mb-2">
                                                    <input className="input" type="text" placeholder="Nombre del Proyecto" name="nombre_proyecto" value={denuncia.nombre_proyecto} onChange={(e)=>(
                                                        setDenuncia({
                                                            ...denuncia,
                                                            [e.target.name]:e.target.value
                                                        })
                                                    )} required />
                                                </div>
                                            </div>
                                            <div className="column is-6">
                                                <label className="label">Monto Aprobado</label>
                                                <div className="control has-icons-right pb-4 mb-2">
                                                    <input className="input" type="number" name="monto_aprovado" value={denuncia.monto_aprovado} onChange={(e)=>(
                                                        setDenuncia({
                                                            ...denuncia,
                                                            [e.target.name]:e.target.value
                                                        })
                                                    )} required />
                                                </div>
                                            </div>
                                        </React.Fragment>
                                :null}
                            </React.Fragment>
                            :null
                        }
                        <div className="column is-12">
                            <div className="field">
                                <div className="control">
                                <label className="label">Descripción</label>
                                    <textarea className="textarea" value={info["user-requirement"]} name="user-requirement" required onChange={(e)=>(
                                        setInfo({
                                            ...info,
                                            [e.target.name]:e.target.value
                                        })
                                    )}></textarea>
                                </div>
                            </div>
                        </div>


                        <div className="column is-12">
                            <NoteFile enviarArchivo={enviarArchivo} message={message} files={files} setFiles={setFiles} fileType={["image/png", "image/jpeg", "application/pdf", "video/mp4", "audio/mpeg", "application/msword", "" ,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]} fileNameType=" PNG - JPG - PDF - MP4 - MP3 - WORD - EXCEL" />
                        </div>

                    
                        <div className="column is-12">
                            <button className = "button is-fullwidth is-blue" onClick={(e)=>{
                                
                                if (validarEmpty(stateBef) === false) {
                                    return message.error('Campos vacíos en el formulario Datos de Beneficiario (1)', 2)
                                }

                                if (validarEmpty(stateDir) === false) {
                                    return message.error('Campos vacíos en el formulario Datos de Dirección (2)', 2)
                                }

                                if(stateBef["bandera_denuncia"] == true && fecha_hechos ==""){
                                    return message.error('Debe indicar la fecha de los hechos', 2)
                                }else{
                                    setDenuncia({
                                        ...denuncia,
                                        "fecha_hechos":fecha_hechos
                                    })
                                }
                                if (validarEmpty(info)) {
                                    insertState({
                                        ...info
                                    })
                                    enviarForm()
                                    insertStep(1)
                                }
                            }}
                            >Guardar</button>
                        </div>
                </div>
            </div>
        </form>
    )
}
export default InfoAtencion