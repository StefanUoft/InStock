import React from "react";
import Modal from "react-modal";
import ExitIcon from "../../assets/Icons/close-24px.svg";
import "./DeleteWarehouseModal.scss"

function DeleteWarehouseModal({ isOpen, onRequestClose, onDelete, itemName }) {
  const handleExit = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="delete-modal"
      overlayClassName="delete-modal-overlay"
    >
      <button className="delete-modal__exit-button" onClick={handleExit}>
        <img src={ExitIcon} alt="Exit Icon" />
      </button>
      <h1 className="delete-modal__title">Delete {itemName} warehouse?</h1>
      <p className="delete-modal__text">
        Please confirm that you’d like to delete the {itemName} from the list of
        warehouses. You won’t be able to undo this action.
      </p>
      <div className="delete-modal__buttons">
        <button
          className="delete-modal__button delete-modal__button--cancel"
          onClick={onRequestClose}
        >
          Cancel
        </button>
        <button
          className="delete-modal__button delete-modal__button--delete"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteWarehouseModal;
