'use client'

import React from "react";
import { Modal } from "antd";

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  children: React.ReactNode;
  createDocument: () => void;
};

const CommonModal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  createDocument,
  children,
}: ModalProps) => {
  const handleOk = () => {
    createDocument();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add a Document"
        open={isModalOpen}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default CommonModal;
