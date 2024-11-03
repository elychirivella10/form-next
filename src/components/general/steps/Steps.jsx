'use client'
export const Step=({type, number, insertStep, title, stepNumero, color})=>{
    return(
        <li className={`step-item is-pointer ${type}`} onClick={()=>{
            if (number ===1) {
                stepNumero(number)
            }
            
        }}>
            <div className={`step-marker ${type} ${color}`}>{type=='is-completed'?<span class="icon"><i class="fa-solid fa-check"></i></span>:null}</div>
            <div className="step-details is-primary is-completed">
                <p className="step-title">{number}</p>
                <p>{title}</p>
            </div>
        </li>
    )
}

const Steps=({number, titles, numeroStep, ...rest})=>{
    const Render=()=>{
        let render =  []

        for (let index = 0; index < number; index++) {
            if (index+1===numeroStep) {
                render.push(<Step {...rest} key={index+1} number={index+1} type={'is-active'} title={titles[`title${index+1}`]}/>)
            }else if (index+1<numeroStep){
                render.push(<Step key={index+1} {...rest} number={index+1} type={'is-completed'} color={'has-background-success-market'} title={titles[`title${index+1}`]}/>)
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