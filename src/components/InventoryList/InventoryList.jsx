import "./InventoryList.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import searchIcon from "/src/assets/Icons/search-24px.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";

function InventoryList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  console.log(import.meta.env.VITE_API_URL);
  useEffect(() => {
    async function getInventoryList() {
      try {
        const response = await axios.get(`${apiUrl}/api/inventories`);
        setInventoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      }
    }
    console.log(getInventoryList());
  }, [apiUrl]);

  const openModal = (inventoryItem) => {
    setSelectedInventory(inventoryItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
  };

  return (
    <div className="inventory">
      <section className="inventory__banner">
        <h1 className="inventory__banner-title">Inventory</h1>
        <form className="inventory__banner-form">
          <input
            className="inventory__banner-input"
            type="text"
            name="search"
            placeholder="Search..."
          />
          <img
            className="inventory__banner-icon"
            src={searchIcon}
            alt="magnifying glass"
          />
        </form>
        <Link className="inventory__banner-button" to={"/inventory/add"}>
          <h3 className="inventory__banner-button-title">+ Add New Item</h3>
        </Link>
      </section>
      <div className="inventory__titles">
        <h4 className="inventory__title">
          INVENTORY ITEM{" "}
          <img
            src={sortIcon}
            alt="sort-icon"
            className="inventory__title-icon"
          />
        </h4>

        <h4 className="inventory__title">
          CATEGORY{" "}
          <img
            src={sortIcon}
            alt="sort-icon"
            className="inventory__title-icon"
          />
        </h4>
        <h4 className="inventory__title">
          STATUS{" "}
          <img
            src={sortIcon}
            alt="sort-icon"
            className="inventory__title-icon"
          />
        </h4>
        <h4 className="inventory__title">
          QTY{" "}
          <img
            src={sortIcon}
            alt="csort-icon"
            className="inventory__title-icon"
          />
        </h4>
        <h4 className="inventory__title">
          Warehouses{" "}
          <img
            src={sortIcon}
            alt="sort-icon"
            className="inventory__title-icon"
          />
        </h4>
        <h4 className="inventory__title">ACTIONS</h4>
      </div>
      <ul className="inventory__list">
        {inventoryData.map((item) => (
          <li key={item.id} className="inventory__item">
            <div className="inventory__item-wrapper">
              <h4 className="inventory__item-title">INVENTORY ITEM</h4>
              <Link
                to={`/inventoryItem/${item.id}`}
                className="inventory__item-value"
              >
                <p className="inventory__item-value-name" onClick={""}>
                  {item.item_name}
                </p>
                <img
                  src={chevronRight}
                  alt="chevron-right"
                  className="inventory__item-value-icon"
                />
              </Link>
            </div>
            <div className="inventory__item-wrapper">
              <h4 className="inventory__item-title inventory__item-title--status">
                STATUS
              </h4>
              <p
                className={`inventory__item-value ${
                  item.status === "In Stock"
                    ? "inventory__item-value--in-stock"
                    : "inventory__item-value--out-of-stock"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="inventory__item-wrapper">
              <h4 className="inventory__item-title">CATEGORY</h4>
              <p className="inventory__item-value inventory__item-value--category">
                {item.category}
              </p>
            </div>
            <div className="inventory__item-wrapper">
              <h4 className="inventory__item-title">QTY</h4>
              <p className="inventory__item-value inventory__item-value--quantity">
                {item.quantity}
              </p>
            </div>
            <div className="inventory__item-wrapper ">
              <h4 className="inventory__item-title">WAREHOUSE</h4>
              <p className="inventory__item-value inventory__item-value--warehouse">
                {item.warehouse_name}
              </p>
            </div>
            <div className="inventory__actions">
              <button
                className="inventory__actions-button"
                onClick={() => openModal(item)}
              >
                <img
                  src={deleteIcon}
                  alt="delete-Icon"
                  className="inventory__actions-icon"
                />
              </button>
              <Link
                to={`/inventory/edit/${item.id}`}
                className="inventory__actions-button"
              >
                {" "}
                <img
                  src={editIcon}
                  alt="edit-Icon"
                  className="inventory__actions-icon"
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedInventory && (
        <DeleteInventoryModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          selectedInventory={selectedInventory}
          setInventories={setInventoryData}
        />
      )}
    </div>
  );
}

export default InventoryList;
