import React from "react";
import "./EditInventoryItem.scss";
import { useState, useEffect } from "react";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";

const EditInventoryItem = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/warehouses`);
        console.log("Response from /api/warehouses:", response);
        setWarehouses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
        setWarehouses([]);
      }
    };
  
    fetchWarehouses();
  }, []);

  const isFormValid = () => {
    const newErrors = {};
    const validateField = (value, fieldName, defaultValue = "") => {
      if (value === defaultValue || (fieldName === "quantity" && value <= 0)) {
        newErrors[fieldName] = "This field is required";
      }
    };

    validateField(name, "name");
    validateField(description, "description");
    validateField(quantity, "quantity");
    validateField(category, "category", "default");
    validateField(warehouse, "warehouse", "default");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;

    try {
      const selectedWarehouse = warehouses.find(
        (wh) => wh.warehouse_name === warehouse
      );
      if (!selectedWarehouse) {
        alert("Invalid warehouse selected");
        return;
      }

      const updatedItem = {
        warehouse_id: selectedWarehouse.id,
        item_name: name,
        description,
        category,
        status,
        quantity: status === "In Stock" ? quantity : 0,
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/inventories/<ITEM_ID>`, 
        updatedItem
      );

      alert("Item updated successfully");
      // navigate("/inventory");
    } catch (error) {
      console.error("Error updating the item:", error);
      alert("Failed to update the item. Please try again.");
    }
  };


  return (
    <div className="edit-item">
      <div className="edit-item__header">
        <button className="edit-item__header-back-button">
          <img src={backArrow} alt="back button" />
        </button>
        <h1 className="edit-item__header-title">Edit Inventory Item</h1>
      </div>

      <form className="edit-item__forms" action="">
        <div className="edit-item__details-form">
          <div className="edit-item__item-details">
            <h2 className="edit-item__item-details-title">Item Details</h2>
            <div className="edit-item__form-container">
              <label className="edit-item__label">Item Name</label>
              <input
                type="text"
                className="edit-item__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Television"
              />
            </div>
          </div>

          <div className="edit-item__form-container">
            <label className="edit-item__label">Description</label>
            <textarea
              className="edit-item__input-description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='This 50", 4k LED TV provides a crystal-clear picture and vivid colors'
            />
          </div>

          <div className="edit-item__form-container">
            <label className="edit-item__label">Category</label>
            <select
              className="edit-item__input-selection"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Electronics">Electronics</option>
              <option value="Gear">Gear</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>

        <div className="edit-item__avail-form">
          <h2 className="edit-item__availability-title">Item Availability</h2>
          <div className="edit-item__form-container">
            <label className="edit-item__label">Status</label>
            <div className="edit-item__status">
              <label className="edit-item__status-radio">
                <input
                  type="radio"
                  name="status"
                  value="In Stock"
                  checked={status === "In Stock"}
                  onChange={() => setStatus("In Stock")}
                  className="edit-item__radio"
                />
                In Stock
              </label>

              <label className="edit-item__status-radio">
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={status === "Out of Stock"}
                  onChange={() => setStatus("Out of Stock")}
                  className="edit-item__radio"
                />
                Out of Stock
              </label>
            </div>
          </div>

          {status === "In Stock" && (
            <div className="edit-item__form-container">
              <label className="edit-item__label">Quantity</label>
              <input
                type="number"
                className="edit-item__Quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="500"
              />
            </div>
          )}

          
            <div className="edit-item__form-container">
              <label className="edit-item__label">Warehouse</label>
              <select
                className="edit-item__input-selection"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              >
                <option value="default">Please select</option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.warehouse_name}>
                    {wh.warehouse_name}
                  </option>
                ))}
                
              </select>
            </div>
          
        </div>
      </form>

      <div className="edit-item__form-buttons">
        <button className="edit-item__button-cancel">Cancel</button>
        <button className="edit-item__button-add" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditInventoryItem;
