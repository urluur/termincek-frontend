import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ConfirmationModal({ show, handleClose, handleConfirm, title, body }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Prekliči</Button>
        <Button variant="danger" onClick={handleConfirm}>Potrdi</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;