import React from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer, ModalOverlay } from './styles';

interface Props {
  showModal: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
}

const Modal = ({ showModal, children, onCloseModal }: Props): JSX.Element => createPortal(
  showModal && (
  <ModalOverlay onClick={onCloseModal}>
    <ModalContainer>
      {children}
    </ModalContainer>
  </ModalOverlay>
  ),
  document.body,
);

export default Modal;
