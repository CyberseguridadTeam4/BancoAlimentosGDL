import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  modalContent: null,
  modalTitle: "Undefined",
  showModal: false,
  openModal: (content: any, title: string) => {},
  closeModal: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: any) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("Undefined");
  const [showModal, setShowModal] = useState(false);

  const openModal = (content: any, title: string) => {
    setModalContent(content);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ modalContent, modalTitle, showModal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
