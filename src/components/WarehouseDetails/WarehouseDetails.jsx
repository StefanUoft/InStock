import "./WarehouseDetails.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "/src/assets/icons/edit-white-24px.svg";
import { Link } from "react-router-dom";

function WarehouseDetails() {
  const warehouseData = {
    name: "Washington",
    address: "33 Pearl Street SW, Washington, USA",
    managerName: "Graeme Lyon",
    contactNumber: "+1 (647) 504-0911",
    contactEmail: "glyon@instock.com",
  };

  return (
    <div className="warehouse">
      <section className="warehouse__details">
        <Link to={"/"}>
        <img
          src={arrowBackIcon}
          alt="arrow-back"
          className="warehouse__details-arrow"
        />
        </Link>
        <p className="warehouse__details-name">{warehouseData.name}</p>
        <Link to={`/warehouses`} className="warehouse__details-icon">
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
          <p className="warehouse__info-value"> {warehouseData.managerName}</p>
          <p className="warehouse__info-position">Warehouse Manager</p>
        </div>
        <div className="warehouse__info-wrapper warehouse__info-wrapper--contact">
          <h4 className="warehouse_info-title">CONTACT INFORMATION:</h4>
          <p className="warehouse__info-value">{warehouseData.contactNumber}</p>
          <p className="warehouse__info-value">{warehouseData.contactEmail}</p>
        </div>
      </section>
    </div>
  );
}

export default WarehouseDetails;
