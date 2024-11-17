import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './WarehouseList.scss'
import axios from 'axios';
import sortIcon from "/src/assets/Icons/sort-24px.svg";
import searchIcon from "/src/assets/Icons/search-24px.svg";
import chevronRight from "/src/assets/Icons/chevron_right-24px.svg";
import deleteIcon from "/src/assets/Icons/delete_outline-24px.svg"
import editIcon from "/src/assets/Icons/edit-24px.svg"
import DeleteWarehouseModal from "/src/components/DeleteWarehouseModal/DeleteWarehouseModal";
import Header from '/src/components/Header/Header.jsx';


function WarehouseList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [warehouses, setWarehouses] = useState([]);
   
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(
                    `http://${import.meta.env.VITE_API_URL}/api/warehouses`
                );

                if (Array.isArray(response.data)) {
                    setWarehouses(response.data);
                } else {
                    console.error("Expected an array but received:", response.data);
                }
            } catch (error) {
                console.error("Error fetching warehouses:", error);
            }
        };

        fetchWarehouses();
    }, [ isModalOpen ]);

    const openModal = (warehouseName) => {
        setSelectedWarehouse(warehouseName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteWarehouse = () => {
        console.log(`Deleting ${selectedWarehouse}`);
        closeModal();
    };

    const deleteButton = (name) => {
        return <img className="warehouse-list__table__actions__delete" src={deleteIcon} onClick={() => openModal(name)} alt="Delete icon" />
    }

    const cardView =
        <div className="warehouse-list__card-view">
            {warehouses.map((wh) =>
                <div className="warehouse-list__card" key={wh.id} id={wh.id}>
                    <div className="warehouse-list__card__item">
                        <label className="warehouse-list__card__header"><h4>WAREHOUSE</h4></label>
                        <Link className="warehouse-list__link" to={`/warehouses/${wh.id}`}><h3>{wh.warehouse_name}</h3><img src={chevronRight} /></Link>
                    </div>
                    <div className="warehouse-list__card__item warehouse-list__card__item--right">
                        <label className="warehouse-list__card__header"><h4>CONTACT NAME</h4></label>
                        <p className="p2">{wh.contact_name}</p>
                    </div>
                    <div className="warehouse-list__card__item">
                        <label className="warehouse-list__card__header"><h4>ADDRESS</h4></label>
                        <p className="p2">{wh.address}, {wh.city}, {wh.country}</p>
                    </div>
                    <div className="warehouse-list__card__item warehouse-list__card__item--right">
                        <label className="warehouse-list__card__header"><h4>CONTACT INFORMATION</h4></label>
                        <p className="p2">{wh.contact_phone}</p><br />
                        <p className="p2">{wh.contact_email}</p>
                    </div>
                    <div className="warehouse-list__card__actions">
                        {deleteButton(wh.warehouse_name)}
                        <Link to={`/warehouses/edit/${wh.id}`}>
                            <img src={editIcon} alt="Edit icon" />
                        </Link>
                    </div>
                </div>

            )}

        </div>;

    const tableView = (
        <div className="warehouse-list__table-view">
            <table className="warehouse-list__table">
                <thead>
                    <tr className="warehouse-list__table__header-row warehouse-list__table__row">
                        <th><div className="warehouse-list__table__header warehouse-list__table__header-pad"><h4>WAREHOUSE </h4><img src={sortIcon}/></div></th>
                        <th><div className="warehouse-list__table__header"><h4>ADDRESS  </h4><img src={sortIcon}/></div></th>
                        <th><div className="warehouse-list__table__header"><h4>CONTACT NAME  </h4><img src={sortIcon}/></div></th>
                        <th><div className="warehouse-list__table__header"><h4>CONTACT INFORMATION  </h4><img src={sortIcon}/></div></th>
                        <th><div className="warehouse-list__table__header warehouse-list__table__right"><h4>ACTIONS  </h4></div></th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map((wh) => (
                        <tr className="warehouse-list__table__row" key={wh.id} id={wh.id}>
                            <td >
                                <Link className="warehouse-list__link warehouse-list__table__left" to={`/warehouses/${wh.id}`}>
                                    <h3>{wh.warehouse_name}</h3>
                                    <img src={chevronRight} alt="chevron right icon" />
                                </Link>
                            </td>
                            <td className="p2">{wh.address}, {wh.city}, {wh.country}</td>
                            <td className="p2">{wh.contact_name}</td>
                            <td className="p2">
                                <p>{wh.contact_phone}</p>
                                <p>{wh.contact_email}</p>
                            </td>
                            <td>
                                <div className="warehouse-list__table__actions">
                                    {deleteButton(wh.warehouse_name)}
                                    <Link to={`/warehouses/edit/${wh.id}`}>
                                        <img src={editIcon} alt="Edit icon" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


    return (
        <>
        <Header />
        <div className="main-content">
        {warehouses ?  ( <div className="warehouse-list">
            <section className="warehouse-list__banner">
                <div className="warehouse-list__banner__header"><h1>Warehouses</h1></div>
                <div className="warehouse-list__banner__interact"><form className="search">
                    <input className="search__input" type="text" name="search" placeholder="Search..." />
                    <img className="search__icon" src={searchIcon} alt="magnifying glass" />
                </form>
                <Link to="/warehouses/add"><button className="warehouse-list__add-warehouse" ><h3>+ Add New Warehouse</h3></button></Link>
                </div>
            </section>
            {cardView}
            {tableView}

            <DeleteWarehouseModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onDelete={deleteWarehouse}
                itemName={selectedWarehouse}
            />
        </div>
        ) : <></>
        }</div>
        </>
    )
}

export default WarehouseList