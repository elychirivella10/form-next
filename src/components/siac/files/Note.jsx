import React, { useState } from 'react'

import axios from 'axios'
import { rutaAxios } from 'variablesGoblales'

import alerta from 'components/alert/Alert'

//helpers
import { getToken, getInfoUser } from 'helpers/auth/auth'

//component
import NoteFile from './NotesFile'


const Note=({id,getNotes})=>{
    const[note, setNote] = useState("")
    const [file, setFile] =useState({})
    const enviarArchivo = async (e) => {
            setFile(e.target.files[0])
    };

    const insertAppointment = async (e)=>{
        e.target.setAttribute("disabled", true);
        
        axios.post(`${rutaAxios}notes`,{note:note,id_task:id,id_user:1})
        .then(respuesta =>{
            if (respuesta.data.note_id && file) {
                const f = new FormData()
                f.append('file', file) 
                f.append('id_note', respuesta.data.note_id) 
                // 'archivo' es el nombre del campo en el formulario
                fetch(`${rutaAxios}notes/file`, {
                    method: 'POST',
                    body: f,
                    headers: {
                        "Authorization": `Bearer ${getToken()}`
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },                                                                                                                                            
                })
                    .then(respuesta => respuesta.text())
                    .then(decodificado => {
                        if(decodificado){
                            getNotes(id)
                        }
                    });
            }else{
                getNotes(id)
            }
            setNote("")
            setFile({})
            alerta.open({type:"success", message:'Se ingreso la nota correctamente'})
            e.target.removeAttribute("disabled");
        })
        .catch(function (error) {
            e.target.removeAttribute("disabled");
            alerta.open({type:"error", message:'Hubo un problema al registrar la nota, intente de nuevo'})
        })
    }

    return(
        <React.Fragment>
            <div className="field">
                <div className="control">
                    <p className=" has-text-weight-semibold mb-5">Descripcion</p>
                    <textarea className="textarea" value={note} onChange={(e)=>(
                        setNote(e.target.value)
                    )}></textarea>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <NoteFile enviarArchivo={enviarArchivo} file={file}/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Note