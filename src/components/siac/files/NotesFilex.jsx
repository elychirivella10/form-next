import React, {useState} from 'react'

const NoteFile = ({files, enviarArchivo, name, setFiles}) =>{
  const [file, setFile] = useState({})

  const saveFile = (e)=>{
    setFiles([
      ...files,
        file
      
    ])
    setFile({})
  }
    return(

      <div className="file is-normal has-name">
        <label className="file-label">
          <input className="file-input" type="file" name="resume" onChange={(e)=>(
            setFile(e.target.files[0])
          )}/>
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
            Cargar archivo
            </span>
          </span>
          <span className="file-name">
            {file.name}
          </span>
        </label>
        {/* <div className="control has-icons-right ml-2 mr-2">
            <input className="input" type="text" placeholder="Descripcion archivo" name="des_archivo"/>
        </div> */}
        <button className='ml-2 button is-blue' onClick={saveFile}>
          Guardar
        </button>
      </div>
    )
}
export default NoteFile