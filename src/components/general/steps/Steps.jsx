import React from 'react'


export const Step=({type, number, insertStep, title})=>{
    return(
        <li className={`step-item ${type}`} onClick={()=>{
            insertStep(number)
        }}>
            <div className={`step-marker ${type}`}></div>
            <div className="step-details is-primary is-completed">
                <p className="step-title">{number}</p>
                <p>{title}</p>
            </div>
        </li>
    )
}

const Steps=({number, numberActive, titles, ...rest})=>{

    const Render=()=>{
        let render =  []

        for (let index = 0; index < number; index++) {
            if (index+1===numberActive) {
                render.push(<Step {...rest} key={index+1} number={index+1} type={'is-active'} title={titles[`title${index+1}`]}/>)
            }else if (index+1<numberActive){
                render.push(<Step key={index+1} {...rest} number={index+1} type={'is-completed'} title={titles[`title${index+1}`]}/>)
            }else{
                render.push(<Step number={index+1} key={index+1} {...rest} title={titles[`title${index+1}`]}/>)
            }
        }

        return render
        
    }
    
    return(
        <ul className="steps is-small" id="steps">
            <Render/>
        </ul>
    )
}
export default Steps