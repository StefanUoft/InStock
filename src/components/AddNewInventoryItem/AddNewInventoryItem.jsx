import React, { useState, useEffect } from "react";
import "./AddNewInventoryItem.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const AddNewInventoryItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("In Stock");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("default");
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});

  // const backClick = (event) => {
  //   event.preventDefault();
  //   navigate("/inventory");
  // };

  // const cancelClick = (event) => {
  //   event.preventDefault();
  //   navigate("/inventory");
  // };

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

  const handleAdd = async (event) => {
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

      const newItem = {
        warehouse_id: selectedWarehouse.id,
        item_name: name,
        description: description,
        category: category,
        status: status,
        quantity: status === "In Stock" ? quantity : 0,
      };

      const addItem = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/inventories`,
        newItem
      );

      alert("Item added successfully");
      navigate("/inventory");
    } catch (error) {
      console.error("Error adding the item:", error);
      alert("Failed to add the item. Please try again.");
    }
  };

  return (
    <div className="add-item">
      <div className="add-item__header">
        <button className="add-item__header-back-button">
          <img src={backArrow} alt="back button" /* onClick={backClick} */ />
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
                className="add-item__quantity-input"
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
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.warehouse_name}>
                    {wh.warehouse_name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </form>
      <div className="add-item__form-buttons">
        <button className="add-item__button-cancel" /* onClick={cancelClick} */>
          Cancel
        </button>
        <button className="add-item__button-add" onClick={handleAdd}>
          + Add Item
        </button>
      </div>
    </div>
  );
};

export default AddNewInventoryItem;
