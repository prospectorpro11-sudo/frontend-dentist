import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";

interface IUCDModal {
  open: boolean;
  children: ReactNode;
  title?: string;
  onHide?: () => void;
  bodyClassName?: string;
  wrapperClassName?: string;
  size?: "sm" | "lg" | "xl";
  centered?: boolean;
}

const UCDModal = (props: IUCDModal) => {
  const { open, children, title, onHide, bodyClassName, size, wrapperClassName, centered } = props;

  return (
    <Modal size={size} onHide={onHide} show={open} className={wrapperClassName} centered={centered}>
      {title && (
        <ModalHeader className="border-0" closeButton>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
      )}
      <ModalBody className={bodyClassName}>{children}</ModalBody>
    </Modal>
  );
};

export default UCDModal;
