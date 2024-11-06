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
        <AntModal open={isModalOpen} onOk={handleOk}>
            {children}
        </AntModal>
    )
}

export default Modal