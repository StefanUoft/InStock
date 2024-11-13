import "./WarehouseDetails.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";

function WarehouseDetails() {
  const warehouseData = {
    name: "Washington",
    address: "33 Pearl Street SW, Washington, USA",
    managerName: "Graeme Lyon",
    contactNumber: "+1 (647) 504-0911",
    contactEmail: "glyon@instock.com",
  };
  const items = [
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

  return (
    <div className="details">
      <section className="details__header">
        <img
          src={arrowBackIcon}
          alt="arrow-back"
          className="details__header-arrow"
        />
        <h2 className="details__header-title">{warehouseData.name}</h2>
        <div className="details__header-edit"></div>
      </section>
      <section className="warehouse-details__info">
        <p>
          <label className="deatail__info-address">WAREHOUSE ADDRESS:</label>{" "}
          {warehouseData.address}
        </p>
        <div className="warehouse-details__info-wrapper">
          <p>
            <label className="deatail__info-name">CONTACT NAME:</label>{" "}
            {warehouseData.managerName} <span>Warehouse Manager</span>
          </p>
          <p>
            <label className="deatail__info-contact">
              CONTACT INFORMATION:
            </label>{" "}
            {warehouseData.contactNumber} {warehouseData.contactEmail}
          </p>
        </div>
      </section>
      <ul className="details__list">
        {items.map((item) => (
          <li key={item.id} className="details__item">
            <div className="details__item-wrapper">
              <h4 className="details__item-title">INVENTORY ITEM</h4>
              <div className="details__item-value">
                <p className="details__item-value-name">{item.name}</p>
                <img
                  src={chevronRight}
                  alt="chevron-right"
                  className="details__item-value-icon"
                />
              </div>
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

export default WarehouseDetails;
