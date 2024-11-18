import React from "react";
import { Link, useLocation } from "react-router-dom";
import InStockLogo from "../../assets/Logo/InStock-Logo.svg";
import "./Header.scss";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__nav-link">
          <img
            src={InStockLogo}
            alt="Instock logo"
            className="header__nav-logo"
          />
        </Link>
        <ul>
          <li>
            <Link
              to="/"
              className={`header__nav-item ${
                location.pathname === "/" ||
                location.pathname.includes("/warehouses")
                  ? "header__nav-item--active"
                  : ""
              }`}
            >
              Warehouses
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className={`header__nav-item ${
                location.pathname.includes("/inventory")
                  ? "header__nav-item--active"
                  : ""
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
