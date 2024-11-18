import "./EditWarehouse.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import BackArrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";

function EditWarehouse() {
  const { id } = useParams();
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching warehouse details:", error);
        alert("Failed to fetch warehouse details. Please try again.");
      }
    };

    fetchWarehouseDetails();
  }, [id]);

  const validateInput = (name, value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      switch (name) {
        case "contact_email":
          error = !emailPattern.test(value) ? "Valid email is required" : "";
          break;
        case "contact_phone":
          error = !value
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll(" ", "")
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
      formattedValue = value
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "");
      console.log(formattedValue);
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
    phoneNumber = phoneNumber
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(" ", "");

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

  const handleSaveClick = async (e) => {
    e.preventDefault();

    console.log(e.target.elements.contact_phone.value);

    if (window.confirm("Are you ready to save?")) {
      let valid = true;
      const newErrors = {};

      Object.keys(formData).forEach((key) => {
        const error = validateInput(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          valid = false;
        }
      });

      console.log(newErrors);

      setErrors(newErrors);

      if (valid) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/warehouses/${id}`,
            formData
          );
          console.log("Warehouse updated successfully:", response.data);
          alert("Warehouse updated successfully. Thank you!");
          navigate("/warehouses");
        } catch (error) {
          console.error("Error updating warehouse:", error);
          alert("There was an error updating the warehouse. Please try again.");
        }
      }
    }
  };

  if (!formData || Object.keys(formData).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-warehouse">
      <div className="edit-warehouse__header">
        <button
          className="edit-warehouse__header-back-button"
          onClick={() => navigate("/warehouses")}
        >
          <img src={BackArrow} alt="back button" />
        </button>
        <h1 className="edit-warehouse__header-title">Edit Warehouse</h1>
      </div>
      {/* Warehouse Details Form */}
      <form className="edit-warehouse__forms" onSubmit={handleSaveClick}>
        <div className="edit-warehouse__warehouse-form">
          <div className="edit-warehouse__warehouse-details">
            <h2 className="edit-warehouse__warehouse-title">
              Warehouse Details
            </h2>
            <div className="edit-warehouse__form-container"></div>
            <label className="edit-warehouse__label">Warehouse Name</label>
            <input
              type="text"
              className="edit-warehouse__input"
              name="warehouse_name"
              placeholder="Warehouse Name"
              value={formData.warehouse_name}
              onChange={handleChange}
            />
            {errors.warehouse_name && <p>{errors.warehouse_name}</p>}
            <div className="edit-warehouse__form-container">
              <label className="edit-warehouse__label">Street Address</label>
              <input
                type="text"
                className="edit-warehouse__input"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p>{errors.address}</p>}
            </div>
            <div className="edit-warehouse__form-container">
              <label className="edit-warehouse__label">City</label>
              <input
                type="text"
                className="edit-warehouse__input"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p>{errors.city}</p>}
            </div>
            <div className="edit-warehouse__form-container">
              <label className="edit-warehouse__label">Country</label>
              <input
                type="text"
                className="edit-warehouse__input"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <p>{errors.country}</p>}
            </div>
          </div>
        </div>
        <div className="edit-warehouse__contact-form">
          <h2 className="edit-warehouse__contact-title">Contact Details</h2>
          <div className="edit-warehouse__form-container">
            <label className="edit-warehouse__label">Contact Name</label>
            <input
              type="text"
              className="edit-warehouse__input"
              name="contact_name"
              placeholder="Contact Name"
              value={formData.contact_name}
              onChange={handleChange}
            />
            {errors.contact_name && <p>{errors.contact_name}</p>}
          </div>
          <div className="edit-warehouse__form-container">
            <label className="edit-warehouse__label">Position</label>
            <input
              type="text"
              className="edit-warehouse__input"
              name="contact_position"
              placeholder="Position"
              value={formData.contact_position}
              onChange={handleChange}
            />
            {errors.contact_position && <p>{errors.contact_position}</p>}
          </div>
          <div className="edit-warehouse__form-container">
            <label className="edit-warehouse__label">Phone Number</label>
            <input
              type="text"
              className="edit-warehouse__input"
              name="contact_phone"
              placeholder="Phone Number"
              value={formData.contact_phone}
              onChange={handleChange}
            />
            {errors.contact_phone && <p>{errors.contact_phone}</p>}
          </div>
          <div className="edit-warehouse__form-container">
            <label className="edit-warehouse__label">Email</label>
            <input
              type="email"
              className="edit-warehouse__input"
              name="contact_email"
              placeholder="Email"
              value={formData.contact_email}
              onChange={handleChange}
            />
            {errors.contact_email && <p>{errors.contact_email}</p>}
          </div>
        </div>
        <div className="edit-warehouse__form-buttons">
          <button
            className="add-warehouse__button-cancel"
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className="edit-warehouse__button-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWarehouse;
