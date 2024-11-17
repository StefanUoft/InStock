import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditInventoryItem.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";

const EditInventoryItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventories/${id}`);
        const item = response.data;
        setName(item.item_name);
        setDescription(item.description);
        setCategory(item.category);
        setStatus(item.status);
        setQuantity(item.quantity);
        setWarehouse(item.warehouse_name);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/warehouses`);
        setWarehouses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchItemDetails();
    fetchWarehouses();
  }, [id]);

  const isFormValid = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Item name is required";
    if (!description) newErrors.description = "Description is required";
    if (!category || category === "default") newErrors.category = "Category is required";
    if (!warehouse || warehouse === "default") newErrors.warehouse = "Warehouse is required";
    if (status === "In Stock" && (quantity <= 0 || !quantity)) newErrors.quantity = "Quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;

    try {
      const selectedWarehouse = warehouses.find((wh) => wh.warehouse_name === warehouse);
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

      await axios.put(`${import.meta.env.VITE_API_URL}/api/inventories/${id}`, updatedItem);
      alert("Item updated successfully");
      navigate("/inventory");
    } catch (error) {
      console.error("Error updating the item:", error);
      alert("Failed to update the item. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/inventory");
  };

  return (
    <div className="edit-item">
      <div className="edit-item__header">
        <button className="edit-item__header-back-button" /* onClick={handleCancel} */>
          <img src={backArrow} alt="back button" />
        </button>
        <h1 className="edit-item__header-title">Edit Inventory Item</h1>
      </div>

      <form className="edit-item__forms">
        <div className="edit-item__details-form">
          <div className="edit-item__form-container">
            <label className="edit-item__label">Item Name</label>
            <input
              type="text"
              className="edit-item__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="edit-item__form-container">
            <label className="edit-item__label">Description</label>
            <textarea
              className="edit-item__input-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <div className="edit-item__form-container">
            <label className="edit-item__label">Category</label>
            <select
              className="edit-item__input-selection"
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
            {errors.category && <div className="error-message">{errors.category}</div>}
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
                />
                Out of Stock
              </label>
            </div>
            {status === "In Stock" && (
              <div className="edit-item__form-container">
                <label className="edit-item__label">Quantity</label>
                <input
                  type="number"
                  className="edit-item__quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                {errors.quantity && <div className="error-message">{errors.quantity}</div>}
              </div>
            )}
          </div>

          <div className="edit-item__form-container">
            <label className="edit-item__label">Warehouse</label>
            <select
              className="edit-item__input-selection"
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
            >
              <option value="default">Select a warehouse</option>
              {warehouses.map((wh) => (
                <option key={wh.id} value={wh.warehouse_name}>
                  {wh.warehouse_name}
                </option>
              ))}
            </select>
            {errors.warehouse && <div className="error-message">{errors.warehouse}</div>}
          </div>
        </div>
      </form>

      <div className="edit-item__form-buttons">
        <button className="edit-item__button-cancel" onClick={handleCancel} >
          Cancel
        </button>
        <button className="edit-item__button-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditInventoryItem;
