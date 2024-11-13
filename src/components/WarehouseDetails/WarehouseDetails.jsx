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
    <div className="warehouse-details">
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
            <label className="deatail__info-contact">CONTACT INFORMATION:</label>{" "}
            {warehouseData.contactNumber}{" "}{warehouseData.contactEmail}
          </p>
        </div>
      </section>
      <ul className="details__list">
        {items.map((item) => (
          <li key={item.id} className="details__list-item">
                {" "}
                <h4 className="details__list-item">INVENTORY ITEM</h4>
                {item.name}
                <img
                  src={chevronRight}
                  alt="chevron-right"
                  className="chevron-right__icon"
                />
              <div>
                {" "}
                <h4>STATUS</h4>
                <span
                  className={`status ${
                    item.status === "In Stock" ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {item.status}
                </span>
              </div>
                <h4>CATEGORY</h4>{item.category}
              <div>
                <h4>QTY:</h4> {item.qty}
              </div>
         
            <div className="item-actions">
              <button className="delete-btn">
                <img
                  src={deleteIcon}
                  alt="delete-Icon"
                  className="delete__icon"
                />
              </button>
              <button className="edit-btn">
                {" "}
                <img src={editIcon} alt="edit-Icon" className="edit__icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WarehouseDetails;
