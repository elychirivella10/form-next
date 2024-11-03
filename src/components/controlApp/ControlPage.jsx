'use client'
import { useState } from "react"
import { filterComponents } from '@/lib/helpers/filters/filterComponents'
import dynamic from "next/dynamic"
const ControlForm = dynamic(() => import("./ControlForm"), { ssr: false })
const ControlAudiencia = dynamic(() => import("./ControlAudiencia"), { ssr: false })
import {App} from 'antd';
import { initAxiosInterceptors } from "@/lib/helpers/auth/auth"


//control de la aplicacion global (Formulario Siac, Audiencia)
const ControlPage = () => {
    initAxiosInterceptors()
    const [step, insertStep] = useState(1)
    const Render=({...rest})=>{
        //funcion para filtrar los componentes que se van a renderizar (el primer parametro, es un objeto con los componentes, la key del objeto de el componente debe ser igual al valor por el cual se le va a filtrar)
        return filterComponents(
            {
                1: <ControlForm insertStepApp={insertStep}/>,
                2: <ControlAudiencia insertStepApp={insertStep}/>
               
            }, step)     
    }

    return (
        <App  message={{
            maxCount: 1
        }}>
            <div>
                <Render number={step} stepNumero={insertStep}/>
            </div>
        </App>
    )
}

export default ControlPage