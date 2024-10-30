'use client'
import { useState } from "react"
import { filterComponents } from '@/lib/helpers/filters/filterComponents'
import dynamic from "next/dynamic"
const ControlForm = dynamic(() => import("./ControlForm"), { ssr: false })


//control de la aplicacion global (Formulario Siac, Audiencia)
const ControlPage = () => {
    const [step, insertStep] = useState(1)
    const Render=({...rest})=>{
        //funcion para filtrar los componentes que se van a renderizar (el primer parametro, es un objeto con los componentes, la key del objeto de el componente debe ser igual al valor por el cual se le va a filtrar)
        return filterComponents(
            {
                1: <ControlForm/>,
                2: <div>Audiencia</div>
               
            }, step)     
    }

    return (
        <div>
            <Render insertStep={insertStep}/>
        </div>
    )
}

export default ControlPage