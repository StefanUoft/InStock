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
        return <img src={deleteIcon} onClick={() => openModal(name)} alt="Delete icon" />
    }

    const cardView =
        <div className="warehouse-list__card-view">
            {warehouses.map((wh) =>
                <div className="warehouse-list__card" key={wh.id} id={wh.id}>
                    <div className="warehouse-list__card__item">
                        <label className="table_header">WAREHOUSE</label>
                        <Link className="warehouse-list__card__item__link" to={`/warehouses/${wh.id}`}><h3>{wh.warehouse_name}</h3><img src={chevronRight} /></Link>
                    </div>
                    <div className="warehouse-list__card__item warehouse-list__card__item--right">
                        <label className="table_header">CONTACT NAME</label>
                        <p className="p2">{wh.contact_name}</p>
                    </div>
                    <div className="warehouse-list__card__item">
                        <label className="table_header">ADDRESS</label>
                        <p className="p2">{wh.address}, {wh.city}, {wh.country}</p>
                    </div>
                    <div className="warehouse-list__card__item warehouse-list__card__item--right">
                        <label className="table_header">CONTACT INFORMATION</label>
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
            <table>
                <thead>
                    <tr>
                        <th className="table_header">WAREHOUSE <img src={sortIcon}/></th>
                        <th className="table_header">ADDRESS  <img src={sortIcon}/></th>
                        <th className="table_header">CONTACT NAME  <img src={sortIcon}/></th>
                        <th className="table_header">CONTACT INFORMATION  <img src={sortIcon}/></th>
                        <th className="table_header">ACTIONS  <img src={sortIcon}/></th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map((wh) => (
                        <tr key={wh.id} id={wh.id}>
                            <td>
                                <Link to={`/warehouses/${wh.id}`}>
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
                            <td className="warehouse-list__table-actions">
                                {deleteButton(wh.warehouse_name)}
                                <Link to={`/warehouses/edit/${wh.id}`}>
                                    <img src={editIcon} alt="Edit icon" />
                                </Link>
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
        <div className="warehouse-list">
            <section className="warehouse-list__banner">
                <h1>Warehouses</h1>
                <form className="search">
                    <input className="search__input" type="text" name="search" placeholder="Search..." />
                    <img className="search__icon" src={searchIcon} alt="magnifying glass" />
                </form>
                <Link className="add-warehouse" to="/warehouses/add"><button className="add-warehouse"><h3>+ Add New Warehouse</h3></button></Link>
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
        </>
    )
}

export default WarehouseList