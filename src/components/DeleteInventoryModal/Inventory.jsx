import React, { useState, useEffect } from "react";
import axios from "axios";
import TrashCanIcon from "../../assets/Icons/delete_outline-24px.svg";
import DeleteInventoryModal from "./DeleteInventoryModal";

function Inventories() {
  const [inventories, setInventories] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  // Fetch inventory items
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/inventories");
        setInventories(response.data);
      } catch (error) {
        console.error("Error fetching inventories:", error.message);
      }
    };

    fetchInventories();
  }, []);

  const openModal = (inventoryItem) => {
    setSelectedInventory(inventoryItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
  };

  return (
    <div>
      <h1>Inventory List</h1>
      {inventories.length > 0 ? (
        inventories.map((inventory) => (
          <div
            key={inventory.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              paddingLeft: "20px",
            }}
          >
            <span>{inventory.item_name}</span>
            <button
              onClick={() => openModal(inventory)}
              style={{ marginLeft: "10px" }}
            >
              <img src={TrashCanIcon} alt="Delete inventory item" />
            </button>
          </div>
        ))
      ) : (
        <p>Loading inventory...</p>
      )}
      {isModalOpen && selectedInventory && (
        <DeleteInventoryModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          selectedInventory={selectedInventory}
          setInventories={setInventories}
        />
      )}
    </div>
  );
}

export default Inventories;