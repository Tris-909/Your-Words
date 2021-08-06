import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

const CommonModal = (props) => {
  const { isOpen, onClose, customeMaxWContent } = props;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} {...props}>
        <ModalOverlay />
        <ModalContent maxW={customeMaxWContent}>{props.children}</ModalContent>
      </Modal>
    </>
  );
};

export default CommonModal;
