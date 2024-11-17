import "./InventoryItemDetails.scss";
import arrowBackIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "/src/assets/icons/edit-white-24px.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from "/src/components/Header/Header";


function InventoryItemDetails() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [itemData, setItemData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getItemData() {
      try {
        const response = await axios.get(`http://${apiUrl}/api/inventories/${id}`);
        setItemData(response.data);
      } catch (error) {
        console.error("Failed to fetch item data:", error);
      }
    }

    getItemData();
  }, [apiUrl, id]);

  //conditional class for styling
  const stockStatus = (status) => {
    return `item-details__info-value stock ${(status === 'Out of Stock') ? 'stock--out' : 'stock--in'}`
  }


  return (
    <>
    <Header/>
    <div className="main-content">
      {itemData ? (<div className="item-details">

        <section className="item-details__banner">
          <div className="item-details__banner__left">
            <img
              src={arrowBackIcon}
              alt="Back Button"
              className="item-details__banner__back-arrow" onClick={() => navigate(-1)}
            />

            <h1 className="item-details__banner__name"> {itemData.item_name}</h1>
          </div>
          <div className="item-details__banner__right">
            <Link to={`/inventory/edit/${itemData.id}`} className="item-details__banner__edit-icon">
              <img
                src={editIcon}
                alt="edit-icon"
                className="item-details__banner__edit-icon-image"
              />
              <span className="item-details__banner__edit-icon-text">Edit</span>
            </Link>
          </div>
        </section>

        <section className="item-details__info">
          <div className="item-details__info__first">
            <div className="item-details__info-wrapper item-details__info-wrapper--description">
              <h4 className="item-details__info-title">ITEM DESCRIPTION:</h4>
              <p className="item-details__info-value"> {itemData.description}</p>
            </div>
            <div className="item-details__info-wrapper item-details__info-wrapper--category">
              <h4 className="item-details__info-title">CATEGORY:</h4>
              <p className="item-details__info-value"> {itemData.category}</p>
            </div>
          </div>
          <div className="item-details__info__second">
            <div className="item-details__info-wrapper item-details__info-wrapper--availability">
              <div className="item-details__info-wrapper--status">
                <h4 className="item-details__info-title">STATUS:</h4>
                <p className={stockStatus(itemData.status)}> {itemData.status}</p>
              </div>
              <div className="item-details__info-wrapper--quantity">
                <h4 className="item-details__info-title">QUANTITY:</h4>
                <p className="item-details__info-value"> {itemData.quantity}</p>
              </div>
            </div>
            <div className="item-details__info-wrapper item-details__info-wrapper--contact">
              <h4 className="item_info-title">WAREHOUSE:</h4>
              <p className="item-details__info-value">{itemData.warehouse_name}</p>
            </div>
          </div>
        </section>

      </div>) : <h2>Loading</h2>
      }

    </div>
    </>
  );
}

export default InventoryItemDetails;

