import React from "react";
import { Link, useLocation } from "react-router-dom";
import InStockLogo from "../../assets/Logo/InStock-Logo.svg";
import "./Header.scss"

function Header() {
  const location = useLocation();

  return (
    <header>
      <nav className="nav">
        <Link to="/">
          <img src={InStockLogo} alt="Instock logo" className="nav__logo" />
        </Link>
        <ul >
          <li>
            <Link
              to="/"
              className={`nav__item ${
                (location.pathname === "/")||(location.pathname.includes("/warehouses")) ? "nav__item--active" : ""
              }`}
            >
              Warehouses
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className={`nav__item ${
                location.pathname.includes("/inventory") ? "nav__item--active" : ""
              }`}
            >
              Inventory
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;