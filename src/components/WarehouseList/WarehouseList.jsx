import React from 'react'
import axios from 'axios';
import sortIcon from "/src/assets/Icons/sort-24px.svg";
import searchIcon from "/src/assets/Icons/search-24px.svg";
import chevronRight from "/src/assets/Icons/chevron_right-24px.svg";
import deleteIcon from "/src/assets/Icons/delete_outline-24px.svg"
import editIcon from "/src/assets/Icons/edit-24px.svg"

function WarehouseList() {

    const getWarehouses = async () => {
        try {
            let res = await axios.get('https://localhost:8080/warehouse/all');
            return res.data
        }
        catch (error) {
            console.log("Error fetching warehouse list data: " + error)
        }
    }


    const warehouseInfo = getWarehouses();
    //warehouseInfo should now be an array of our warehouses. we want to map them to cards or a sortable table depending on media queries.

    const cardView =
        <div className="warehouse-list__card-view">
            {warehouseInfo.map((wh) =>
                <div className="warehouse-list__card" key={wh.id} id={wh.id}>
                    <div className="warehouse-list__card__item">
                        <label className="table_header">WAREHOUSE</label>
                        <Link to="/"><h3>{wh.warehouse_name}</h3><img src={chevronRight} /></Link>
                    </div>
                    <div className="warehouse-list__card__item">
                        <label className="table_header">CONTACT NAME</label>
                        <p className="p2">{wh.contact_name}</p>
                    </div>
                    <div className="warehouse-list__card__item">
                        <label className="table_header">ADDRESS</label>
                        <p className="p2">{wh.address}, {wh.city}, {wh.country}</p>
                    </div>
                    <div className="warehouse-list__card__item">
                        <label className="table_header">CONTACT INFORMATION</label>
                        <p className="p2">{wh.contact_phone}</p><br />
                        <p className="p2">{wh.contact_email}</p>
                    </div>
                    <div className="warehouse-list__card__interact">
                        <img src={deleteIcon} /><img src={editIcon} />
                    </div>
                </div>

            )}

        </div>;

    const tableView = <div className="warehouse-list__table-view"></div>;


    return (
        <div className="warehouse-list">
            <section className="warehouse-list__banner">
                <h2>Warehouses</h2>
                <form className="search">
                    <img className="search__icon" src={searchIcon} alt="magnifying glass" />
                    <input className="search__input" type="text" name="search" placeholder="Search" />
                </form>
                <button className="add-warehouse"><h3>+ Add New Warehouse</h3></button>
            </section>
            {cardView}
            {tableView}
        </div>
    )
}

export default WarehouseList