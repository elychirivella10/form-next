import { useState } from 'react';
import { Modal as AntModal } from 'antd';
const Modal = ({show, children}) => {
    const [isModalOpen, setIsModalOpen] = useState(show);
    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return (
      <div class={`modal ${isModalOpen?'is-active':''}`} >
        <div class="modal-background"></div>
          <div class="modal-content">
            {children}

          </div>
        <button class="modal-close is-large" aria-label="close" onClick={handleCancel}></button>
      </div>
    )
}

export default Modal