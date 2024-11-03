'ues client'
import {useState, useEffect} from "react";
import Panel from "@/components/general/panel/Panel";
import Steps from "@/components/general/steps/Steps";
import moment from "moment";
import { filterComponents } from "@/lib/helpers/filters/filterComponents";
import InfoBeneficiario from "@/components/siac/form/infoBeneficiario";
import InfoDireccion from "@/components/siac/form/InfoDireccion";
import InfoAtencion from "@/components/siac/form/InfoAtencion";

const ControlForm = ({insertStepApp}) => {
    const [step, insertStep] = useState(1)
    const [visited, setVisited] = useState(false)
    //estado para controlar las etapas del formulario de registro (existen 3 etapas)
    const [stateBef, setStateBef] = useState({
        "date-entry":moment().format('YYYY-MM-DD'),
        "person-id":"",
        "person-name":"",
        "person-lastname":"",
        "telephone":"",
        "nacionalidad":"V",
        "idusuopr":19,
        "edad":"",
        "fecha_nacimiento":"",
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

    const [stateDir, setStateDir] = useState({
        "direccion":"No aplica",
        "state":0,
        "county":0,
        "town":0

    })

    const [stateAte, setStateAte] = useState({


    })

    const Render=({...rest})=>{
        //funcion para filtrar los componentes que se van a renderizar (el primer parametro, es un objeto con los componentes, la key del objeto de el componente debe ser igual al valor por el cual se le va a filtrar)
        return filterComponents(
            {
                1: <InfoBeneficiario insertState ={setStateBef} stateBef={stateBef} {...rest} insertStepApp={insertStepApp}/>,
                2: <InfoDireccion insertState={setStateDir} stateDir={stateDir} {...rest}/>,
                3: <InfoAtencion insertState={setStateAte} insertStateDir={setStateDir} insertStateBef={setStateBef} stateDir={stateDir} stateAte={stateAte} stateBef={stateBef} {...rest}/>
            }, step)     
    }


    return (
        <div className="columns is-centered is-multiline mt-5">
            <div className="column is-9 mt-4">
                <Panel title='SAPI' subtitle={`Atención al ciudadano`}/>
            </div>
            <div className="column is-9">
                <div className="box">
                    <Steps 
                        number={3} 
                        numberActive={step} 
                        numeroStep={step}
                        numberStep={insertStep}
                        stepNumero={insertStep}
                        key={step} 
                        titles={{title1:'Datos Beneficiario',title2:'Dirección',title3:'Atención'}}
                    />
                </div>
            </div>
            <div className="column is-9">
                    <Render insertStep={insertStep} insertStepApp={insertStepApp}/>
            </div>
        </div>
    )
}

export default ControlForm