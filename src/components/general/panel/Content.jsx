import React from 'react'

const Content=({data})=>{
    if (data) {
        //se recorre data con un map, para poder iterar sobre todos los datos que estan llegando a la lista
        let content = []
        data.map((d)=>{
            //se recorre cada objeto que se encuentra en cada posicion del array que se itero con el map y se general los elementos conten de la lista
            const c = <React.Fragment><p className='mb-1'><span className='has-text-weight-semibold'>{d.title}</span> <span>-</span> <span>{d.description}</span></p></React.Fragment>
            return content.push(c)
        })

        return <div className="content">{content}</div> 
    }else{
        return null
    }
}
export default Content