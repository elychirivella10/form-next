import {useState, useEffect, Fragment} from 'react'

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    console.log(reader)
    reader.onerror = (error) => reject(error);
  });

const NoteFile = ({files, name, setFiles, fileNumber, message, fileType, fileNameType}) =>{
  const [previewOpen, setPreviewOpen] = useState(false);
  const [error, setError] = useState(false)
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
  ]);

  const handleChange = ({fileList: newFileList }, event) => {
  return error === false ?setFiles(newFileList):null
};


  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Cargar {name}
      </div>
    </button>
  );

  const beforeUpload = (file,  onSuccess) => {
    setError(false)
    const typeFile = file.type
    const types = fileType.filter(type=> type === typeFile)
    const isLt2M = (file.size / 1024 / 1024) <= 10;
    if (types.length===0) {
      setError(true)
      message.error('El archivo cargado no esta en el formato '+fileNameType)
    }
    if (!isLt2M) {
      setError(true)
      message.error('El archivo cargado no puede pesar mas de 10MB')
    }      
    onSuccess(file);
    return true;
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };




  useEffect(() => {
    setFileList([
      ...files
    ])

    return () => setError(false);
  }, [files])
  
    return(
      <Fragment>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
        >
          {fileList.length >= fileNumber ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </Fragment>
    )
}
export default NoteFile