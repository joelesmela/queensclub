import React, { useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';

const ModalImage = ({ show, handleClose, src }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalBody
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#050914',
        }}
      >
        <img src={src} style={{ height: '100%' }} />
      </ModalBody>
    </Modal>
  );
};

export default ModalImage;
