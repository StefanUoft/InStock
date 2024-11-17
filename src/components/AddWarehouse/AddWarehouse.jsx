import "./AddWarehouse.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import BackArrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";

function AddWarehouse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/warehouses`
        );
        console.log("Response from /api/warehouses:", response);
        setWarehouses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
        setWarehouses([]);
      }
    };

    fetchWarehouses();
  }, []);

  const validateInput = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      switch (name) {
        case "contact_email":
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          error = !emailPattern.test(value) ? "Valid email is required" : "";
          break;
        case "contact_phone":
          const parsedPhoneNumber = parsePhoneNumberFromString(value, "US");
          error =
            !parsedPhoneNumber || !parsedPhoneNumber.isValid()
              ? "Valid phone number is required"
              : "";
          break;
        default:
          break;
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "contact_phone") {
      formattedValue = formatPhoneNumber(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));

    const error = validateInput(name, formattedValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const formatPhoneNumber = (phoneNumber) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "US");
    return parsedPhoneNumber
      ? parsedPhoneNumber.formatInternational()
      : phoneNumber;
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/warehouses");
    }
  };

  const handleAddClick = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateInput(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/warehouses`,
          formData
        );
        console.log("Warehouse added successfully:", response.data);
        alert("Warehouse added successfully. Thank you!");

        navigate("/warehouses");
      } catch (error) {
        console.error("Error adding warehouse:", error);
        alert("There was an error adding the warehouse. Please try again.");
      }
    }
  };

  return (
    <div className="add-warehouse">
      <div className="add-warehouse__header">
        <button
          className="add-warehouse__header-back-button"
          onClick={() => navigate("/warehouses")}
        >
          <img src={BackArrow} alt="back button" />
        </button>
        <h1 className="add-warehouse__header-title">Add New Warehouse</h1>
      </div>

      {/*Warehouse Details Section*/}
      <form className="add-warehouse__forms" onSubmit={handleAddClick}>
        <div className="add-warehouse__warehouse-form">
          <div className="add-warehouse__warehouse-details">
            <h2 className="add-warehouse__warehouse-title">
              Warehouse Details
            </h2>
            <div className="add-warehouse__form-container">
              <label className="add-warehouse__label">Warehouse Name</label>
              <input
                type="text"
                className="add-warehouse__input"
                name="warehouse_name"
                placeholder="Warehouse Name"
                value={formData.warehouse_name}
                onChange={handleChange}
              />
              {errors.warehouse_name && <p>{errors.warehouse_name}</p>}
            </div>

            <div className="add-warehouse__form-container">
              <label className="add-warehouse__label">Street Address</label>
              <input
                type="text"
                className="add-warehouse__input"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p>{errors.address}</p>}
            </div>

            <div className="add-warehouse__form-container">
              <label className="add-warehouse__label">City</label>
              <input
                type="text"
                className="add-warehouse__input"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p>{errors.city}</p>}
            </div>

            <div className="add-warehouse__form-container">
              <label className="add-warehouse__label">Country</label>
              <input
                type="text"
                className="add-warehouse__input"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <p>{errors.country}</p>}
            </div>
          </div>
        </div>

        {/*Contact Details Section*/}
        <div className="add-warehouse__contact-form">
          <h2 className="add-warehouse__contact-title">Contact Details</h2>
          <div className="add-warehouse__form-container">
            <label className="add-warehouse__label">Contact Name</label>
            <input
              type="text"
              className="add-warehouse__input"
              name="contact_name"
              placeholder="Contact Name"
              value={formData.contact_name}
              onChange={handleChange}
            />
            {errors.contact_name && <p>{errors.contact_name}</p>}
          </div>

          <div className="add-warehouse__form-container">
            <label className="add-warehouse__label">Position</label>
            <input
              type="text"
              className="add-warehouse__input"
              name="contact_position"
              placeholder="Position"
              value={formData.contact_position}
              onChange={handleChange}
            />
            {errors.contact_position && <p>{errors.contact_position}</p>}
          </div>

          <div className="add-warehouse__form-container">
            <label className="add-warehouse__label">Phone Number</label>
            <input
              type="text"
              className="add-warehouse__input"
              name="contact_phone"
              placeholder="Phone Number"
              value={formData.contact_phone}
              onChange={handleChange}
            />
            {errors.contact_phone && <p>{errors.contact_phone}</p>}
          </div>

          <div className="add-warehouse__form-container">
            <label className="add-warehouse__label">Email</label>
            <input
              type="email"
              className="add-warehouse__input"
              name="contact_email"
              placeholder="Email"
              value={formData.contact_email}
              onChange={handleChange}
            />
            {errors.contact_email && <p>{errors.contact_email}</p>}
          </div>
        </div>
      </form>

      {/*Buttons Section*/}
      <div className="add-warehouse__form-buttons">
        <button
          className="add-warehouse__button-cancel"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button type="submit" className="add-warehouse__button-add">
          + Add Warehouse
        </button>
      </div>
    </div>
  );
}

export default AddWarehouse;
