import React from "react";
import Modal from "react-modal";
import ExitIcon from "../../assets/Icons/close-24px.svg";
import axios from "axios";
import "./DeleteInventoryModal.scss";

function DeleteInventoryModal({
  isOpen,
  onRequestClose,
  selectedInventory,
  setInventories,
}) {
  const handleExit = () => {
    onRequestClose();
  };

  const deleteInventoryItem = async () => {
    try {
      if (!selectedInventory) return;

      await axios.delete(`${import.meta.env.VITE_API_URL}/api/inventories/${selectedInventory.id}`);
      setInventories((prev) =>
        prev.filter((inventory) => inventory.id !== selectedInventory.id)
      );
      onRequestClose();
    } catch (error) {
      console.error("Error deleting inventory item:", error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="delete-modal"
      overlayClassName="delete-modal-overlay"
    >
      <div className='delete-modal__top'>
        <button className="delete-modal__exit-button" onClick={handleExit}>
          <img src={ExitIcon} alt="Exit Icon" />
        </button>
        <h1 className="delete-modal__title">
          Delete {selectedInventory.item_name} inventory item?
        </h1>
        <p className="delete-modal__text">
          Please confirm that you’d like to delete {selectedInventory.item_name} from the inventory list. 
          You won’t be able to undo this action.
        </p>
      </div>
      <div className="delete-modal__buttons">
        <button
          className="delete-modal__button delete-modal__button--cancel"
          onClick={onRequestClose}
        >
          Cancel
        </button>
        <button
          className="delete-modal__button delete-modal__button--delete"
          onClick={deleteInventoryItem}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteInventoryModal;