import "./WarehouseInventoryList.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
// import axios from "axios";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WarehouseInventoryList() {

  const inventoryData = [
    {
      id: 1,
      name: "Television",
      status: "In Stock",
      category: "Electronics",
      qty: 500,
    },
    {
      id: 2,
      name: "Gym Bag",
      status: "Out of Stock",
      category: "Gear",
      qty: 0,
    },
    {
      id: 3,
      name: "Hoodie",
      status: "Out of Stock",
      category: "Apparel",
      qty: 0,
    },
    {
      id: 4,
      name: "Keychain",
      status: "In Stock",
      category: "Accessories",
      qty: 2000,
    },
    {
      id: 5,
      name: "Shampoo",
      status: "In Stock",
      category: "Health",
      qty: 4350,
    },
    {
      id: 6,
      name: "Phone Charger",
      status: "In Stock",
      category: "Electronics",
      qty: 10000,
    },
    { id: 7, name: "Tent", status: "In Stock", category: "Gear", qty: 800 },
    {
      id: 8,
      name: "Winter Jacket",
      status: "Out of Stock",
      category: "Apparel",
      qty: 0,
    },
  ];

  // async function getInventoryItems() => {
  //   try {
  //     const response = await axios.get("");
  //     return response.data;
  //   } catch (error) {
  //     console.log("Error fetching inventory data: " + error);
  //   }
  // };

  // const [inventoryData, setInventoryData] = useState(updatedIndentoryData);

  // useEffect(() => {
  //   setInventoryData(updatedInventoryData);
  // }, [updatedInventoryData]);

  // console.log(inventoryData);

  return (
    <div className="details">
      <ul className="details__list">
        {inventoryData.map((item) => (
          <li key={item.id} className="details__item">
            <div className="details__item-wrapper">
              <h4 className="details__item-title">INVENTORY ITEM</h4>
              <Link
                to={`/inventoryItem/${item.id}`}
                className="details__item-value"
              >
                <p className="details__item-value-name" onClick={""}>
                  {item.name}
                </p>
                <img
                  src={chevronRight}
                  alt="chevron-right"
                  className="details__item-value-icon"
                />
              </Link>
            </div>
            <div className="details__item-wrapper">
              <h4 className="details__item-title">STATUS</h4>
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
              <p className="details__item-value">{item.category}</p>
            </div>
            <div className="details__item-wrapper">
              <h4 className="details__item-title">QTY:</h4>
              <p className="details__item-value">{item.qty}</p>
            </div>
            <div className="details__actions">
              <button className="details__actions-button">
                <img
                  src={deleteIcon}
                  alt="delete-Icon"
                  className="details__actions-icon"
                />
              </button>
              <button className="details__actions-button">
                {" "}
                <img
                  src={editIcon}
                  alt="edit-Icon"
                  className="details__actions-icon"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WarehouseInventoryList;
