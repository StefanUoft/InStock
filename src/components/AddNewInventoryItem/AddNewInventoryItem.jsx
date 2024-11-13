import React from "react";
import "./AddNewInventoryItem.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddNewInventoryItem = () => {
//   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("In Stock");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("default");

  return (
    <div className="add-item">
      <div className="add-item__header">
        <button className="add-item__header-back-button">
          <img src={backArrow} alt="back button" />
        </button>
        <h1 className="add-item__header-title">Add New Inventory Item</h1>
      </div>

      <form className="add-item__forms" action="">
        <div className="add-item__details-form">
          <div className="add-item__item-details">
            <h2 className="add-item__item-details-title">Item Details</h2>
            <div className="add-item__form-container">
              <label className="add-item__label">Item Name</label>
              <input
                type="text"
                className="add-item__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
              />
            </div>
          </div>

          <div className="add-item__form-container">
            <label className="add-item__label">Description</label>
            <textarea
              className="add-item__input-description"
              row={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please enter a brief item description..."
            />
          </div>

          <div className="add-item__form-container">
            <label className="add-item__label">Category</label>
            <select
              className="add-item__input-selection"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Gear">Gear</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>
        <div className="add-item__avail-form">
          <h2 className="add-item__availability-title">Item Availability</h2>
          <div className="add-item__form-container">
            <label className="add-item__label">Status</label>

            <div className="add-item__status">
              <label className="add-item__status-radio">
                <input
                  type="radio"
                  name="status"
                  value="In Stock"
                  checked={status === "In Stock"}
                  onChange={() => setStatus("In Stock")}
                  className="add-item__radio"
                />
                In Stock
              </label>

              <label className="add-item__status-radio">
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={status === "Out of Stock"}
                  onChange={() => setStatus("Out of Stock")}
                  className="add-item__radio"
                />
                Out of Stock
              </label>
            </div>
          </div>

          {status === "In Stock" && (
            <div className="add-item__form-container">
              <label className="add-item__label">Quantity</label>
              <input
                type="number"
                className="add-item__Quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="0"
              />
            </div>
          )}

          {status === "In Stock" && (
            <div className="add-item__form-container">
              <label className="add-item__label">Warehouse</label>
              <select
                className="add-item__input-selection"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              >
                <option value="default">Please select</option>
              </select>
            </div>
          )}
        </div>
      </form>
      <div className="add-item__form-buttons">
      <button className="add-item__button-cancel">
          Cancel
        </button>
        <button className="add-item__button-add">
          + Add Item
        </button>
      </div>
    </div>
  );
};

export default AddNewInventoryItem;
