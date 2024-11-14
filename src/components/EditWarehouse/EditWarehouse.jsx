// import React, { useState } from "react";
// import "./EditWarehouse.scss";
// import BackArrow from "../../assets/Icons/arrow_back-24px.svg";
// import { useNavigate } from "react-router-dom";

// function EditWarehouse() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         warehouse_name: "",
//         address: "",
//         city: "",
//         country: "",
//         contact_name: "",
//         contact_position: "",
//         contact_phone: "",
//         contact_email: "",
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//         validateInput(name, value);
//     };

//     const validateInput = (name, value) => {
//         let error = "";
//         if (!value) {
//             error = "This field is required";
//         } else {
//             if (name === "contact_email") {
//                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 error = !emailPattern.test(value)
//                     ? "Valid email is required"
//                     : "";
//             }
//         }
//         setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     };

//     const handleCancelClick = (e) => {
//         e.preventDefault();
//         if (window.confirm("Are you sure you want to cancel?")) {
//             window.history.back();
//         }
//     };

//     const handleBackClick = () => {
//         window.history.back();
//     };

//     const handleSaveClick = (e) => {
//         e.preventDefault();
//         if (window.confirm("Are you ready to save?")) {
//             console.log("Form data saved:", formData);
//             navigate("/warehouses");
//         }
//     };

//     return (
//         <section className="card">
//             <div className="card__title">
//                 <div className="card__title-container">
//                     <button className="backbutton__link" onClick={handleBackClick}>
//                         <img
//                             className="card__icon-arrow"
//                             src={BackArrow}
//                             alt="Back to Warehouse List Page"
//                         />
//                     </button>
//                     <h1>Edit Warehouse</h1>
//                 </div>
//             </div>
//             <div className="forms">
//                 <div className="forms__container">
//                     {/* Form fields */}
//                     <div className="form-group">
//                         <label htmlFor="warehouse_name">Warehouse Name</label>
//                         <input
//                             type="text"
//                             id="warehouse_name"
//                             name="warehouse_name"
//                             value={formData.warehouse_name}
//                             onChange={handleChange}
//                         />
//                         {errors.warehouse_name && <p>{errors.warehouse_name}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="contact_email">Contact Email</label>
//                         <input
//                             type="email"
//                             id="contact_email"
//                             name="contact_email"
//                             value={formData.contact_email}
//                             onChange={handleChange}
//                         />
//                         {errors.contact_email && <p>{errors.contact_email}</p>}
//                     </div>
                
//                 </div>
//                 <div className="form__ctas">
//                     <button
//                         className="form__ctas-cancel"
//                         type="button"
//                         onClick={handleCancelClick}
//                     >
//                         <h3>Cancel</h3>
//                     </button>
//                     <button
//                         className="form__ctas-edit"
//                         type="button"
//                         onClick={handleSaveClick}
//                     >
//                         <h3>Save</h3>
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default EditWarehouse;
