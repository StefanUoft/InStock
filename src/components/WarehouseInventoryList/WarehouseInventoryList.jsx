import "./WarehouseInventoryList.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function InventoryList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [inventoryData, setInventoryData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function getInventoryList() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/warehouses/${id}/inventories`
        );
        setInventoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      }
    }
    getInventoryList();
  }, [apiUrl, id]);
  return (
    <div className="details">
      <div className="details__titles">
        <h4 className="details__title">
          INVENTORY ITEM{" "}
          <img src={sortIcon} alt="sort-icon" className="details__title-icon" />
        </h4>
        <h4 className="details__title">
          CATEGORY{" "}
          <img src={sortIcon} alt="sort-icon" className="details__title-icon" />
        </h4>
        <h4 className="details__title">
          STATUS{" "}
          <img src={sortIcon} alt="sort-icon" className="details__title-icon" />
        </h4>
        <h4 className="details__title">
          QUANTITY{" "}
          <img
            src={sortIcon}
            alt="csort-icon"
            className="details__title-icon"
          />
        </h4>
        <h4 className="details__title">ACTIONS</h4>
      </div>
      <ul className="details__list">
        {inventoryData.map((item) => (
          <li key={item.id} className="details__item">
            <div className="details__item-wrapper">
              <h4 className="details__item-title">INVENTORY ITEM</h4>
              <Link
                to={`/inventory/${item.id}`}
                className="details__item-value"
              >
                <p className="details__item-value-name" onClick={""}>
                  {item.item_name}
                </p>
                <img
                  src={chevronRight}
                  alt="chevron-right"
                  className="details__item-value-icon"
                />
              </Link>
            </div>
            <div className="details__item-wrapper">
              <h4 className="details__item-title details__item-title--status">
                STATUS
              </h4>
              <p
                className={`details__item-value ${
                  item.status === "In Stock"
                    ? "details__item-value--in-stock"
                    : "details__item-value--out-of-stock"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="details__item-wrapper">
              <h4 className="details__item-title">CATEGORY</h4>
              <p className="details__item-value details__item-value--category">
                {item.category}
              </p>
            </div>
            <div className="details__item-wrapper">
              <h4 className="details__item-title">QTY:</h4>
              <p className="details__item-value details__item-value--quantity">
                {item.quantity}
              </p>
            </div>
            <div className="details__actions">
              <button className="details__actions-button">
                <img
                  src={deleteIcon}
                  alt="delete-Icon"
                  className="details__actions-icon"
                />
              </button>
              <Link  to={`/inventory/edit/${item.id}`} className="details__actions-button" >
                {" "}
                <img
                  src={editIcon}
                  alt="edit-Icon"
                  className="details__actions-icon"
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;