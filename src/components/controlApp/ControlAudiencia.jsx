'ues client'
import {useState, useEffect} from "react";
import Panel from "@/components/general/panel/Panel";
import Steps from "@/components/general/steps/Steps";
import { filterComponents } from "@/lib/helpers/filters/filterComponents";
import { validarEmpty } from "@/lib/helpers/validate/validateEmpty";
import UserInfo from "@/components/audiencias/UserInfor";
import BufeteInfo from "@/components/audiencias/BufeteInfo";
import AudienciaInfo from "@/components/audiencias/AudienciaInfo";
import SolicitudesInfo from "@/components/audiencias/SolicitudesInfo";
import { insertarAudiencia } from "@/lib/fetch/audiencia";
import { insertarBufete, insertBufetesAudiencias } from "@/lib/fetch/bufete";
import { insertarSolicitud } from "@/lib/fetch/solicitudes";
import Resultado from "../audiencias/Resultado";
import Modal from '@/components/general/modal/Modal';
import Warning from "../audiencias/warning/Warning";

const ControlAudiencia = ({insertStepApp}) =>{
    const [step, insertStep] = useState(1)
    const [register, insertRegister] = useState({
        nombre_contacto:"",
        apellido_contacto:"",
        typeIdentification:"V",
        identificacion_contacto:"",
        telefono_contacto:"",
        correo_contacto:"",
    })
    const [bufetes, insertBufetes] = useState({
        nombre_bufete:"",
        correo:"",
        rif:"",
        telefono:"",
    })
    const [audiencia, insertAudiencia] = useState({
        id_formato_cita:"",
        id_estado:1,
        id_pais:0,
        id_estado_pais:0,
        id_municipio:"",
        id_parroquia:"",
        id_trabajador:0,
        id_area:0,
    })

    const [id_audiencia, insertIdAudiencia] = useState(0)
    const [solicitudes, insertSolicitudes] = useState([])
    const Render=({...rest})=>{
        //funcion para filtrar los componentes que se van a renderizar (el primer parametro, es un objeto con los componentes, la key del objeto de el componente debe ser igual al valor por el cual se le va a filtrar)
        return filterComponents(
            {
               1: <UserInfo {...rest}/>,
               2: <BufeteInfo {...rest}/>,
               3: <AudienciaInfo {...rest}/>,
               4: <SolicitudesInfo {...rest} deleteR = {deleteRequest}/>,
               5: <Resultado {...rest}/>
            }, step)     
    }

    const insertAudienciaWeb = async () => {
        if (validarEmpty(register) && validarEmpty(audiencia) && solicitudes.length > 0) {
            Promise.all([
                insertarAudiencia(audiencia, register),
                insertarBufete(bufetes)
            ])
            .then(res => {
                if (res[0] && res[1]) {
                    insertIdAudiencia(res[0].requerimientos_id)
                    return Promise.all([
                        insertarSolicitud(solicitudes, res[0].requerimientos_id),
                        insertBufetesAudiencias(res[1].id, res[0].requerimientos_id)
                    ]);
                }
            })
            .then(res => {
                if (res[0] && res[1]) {
                    insertStep(5)
                } else {
                    console.error('Error al insertar solicitudes o bufetes-audiencias');
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            message.error('Debe ingresar los campos obligatorios');
        }
    };
         

    const deleteRequest=(request,)=>{
        insertSolicitudes(
            solicitudes.filter(r=>r.num_solicitud !== request)
        )
    }
    return(
        <div className="columns is-centered is-multiline mt-5">
            <Modal show={true}>
                <Warning/>
            </Modal>
        <div className="column is-9 mt-4">
            <Panel title='SAPI' subtitle={`Audiencia`}/>
        </div>
        {step <5?
            <div className="column is-9">
                <div className="box">
                    <Steps 
                        number={4} 
                        numberActive={step} 
                        numeroStep={step}
                        numberStep={insertStep}
                        stepNumero={insertStep}
                        key={step} 
                        titles={{title1:'Datos del Usuario',title2:'Información Bufete',title3:'Información Audiencia', title4:'Solicitudes'}}
                    />
                </div>
            </div>
        :null}
        
        <div className="column is-9">
                <Render insertStep={insertStep} id_audiencia={id_audiencia} deleteRequest={deleteRequest} insertAudienciaWeb={insertAudienciaWeb} insertStepApp={insertStepApp} insertRegister={insertRegister} register={register} bufetes={bufetes} insertBufetes={insertBufetes} audiencia={audiencia} insertAudiencia={insertAudiencia} solicitudes={solicitudes} insertSolicitudes={insertSolicitudes}/>
        </div>
    </div>
    )
}

export default ControlAudiencia