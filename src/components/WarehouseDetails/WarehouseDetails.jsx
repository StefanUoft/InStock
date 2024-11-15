import "./WarehouseDetails.scss";
import arrowBackIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "/src/assets/icons/edit-white-24px.svg";
import { Link,useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

function WarehouseDetails() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [warehouseData, setWarehouseData] = useState({
    id:1,
    warehouse_name: "Washington",
    address: "33 Pearl Street SW, Washington, USA",
    contact_position: "Graeme Lyon",
    contact_phone: "+1 (647) 504-0911",
    contact_email: "glyon@instock.com",
  });
  const { id } = useParams();

  useEffect(() => {
    async function getWarehouseData() {
      try {
        const response = await axios.get(`${apiUrl}/api/warehouses/${id}`);
        setWarehouseData(response.data);
      } catch (error) {
        console.error("Failed to fetch warehouse data:", error);
      }
    }

    getWarehouseData();
  }, [apiUrl, id]);
console.log(warehouseData)

  return (
    <div className="warehouse">
      <section className="warehouse__details">
        <Link to={`/`}>
        <img
          src={arrowBackIcon}
          alt="arrow-back"
          className="warehouse__details-arrow"
        />
        </Link>
        <p className="warehouse__details-name">{warehouseData.warehouse_name}</p>
        <Link to={`/warehouses/${warehouseData.id}/edit`} className="warehouse__details-icon">
          <img
            src={editIcon}
            alt="edit-icon"
            className="warehouse__details-icon-image"
          />
          <span className="warehouse__details-icon-text">Edit</span>
        </Link>
      </section>
      <section className="warehouse__info">
        <div className="warehouse__info-wrapper warehouse__info-wrapper--address">
          <h4 className="warehouse__info-title">WAREHOUSE ADDRESS:</h4>
          <p className="warehouse__info-value"> {warehouseData.address}</p>
        </div>
        <div className="warehouse__info-wrapper warehouse__info-wrapper--name">
          <h4 className="warehouse__info-title">CONTACT NAME:</h4>
          <p className="warehouse__info-value"> {warehouseData.contact_position}</p>
          <p className="warehouse__info-position">Warehouse Manager</p>
        </div>
        <div className="warehouse__info-wrapper warehouse__info-wrapper--contact">
          <h4 className="warehouse_info-title">CONTACT INFORMATION:</h4>
          <p className="warehouse__info-value">{warehouseData.contact_phone}</p>
          <p className="warehouse__info-value">{warehouseData.contact_email}</p>
        </div>
      </section>
    </div>
  );
}

export default WarehouseDetails;
