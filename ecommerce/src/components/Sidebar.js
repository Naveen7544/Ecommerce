import React, { useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './Sidebar.css';

const PrimeSidebar = ({ sidebarWidth }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const getUser = JSON.parse(localStorage.getItem('authUser'));
  console.log("getUserss", getUser);

  const allItems = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      command: () => {
        navigate("/dashboard");
        setActiveItem("/dashboard");
      },
    },
    {
      label: "User Management",
      icon: "pi pi-users",
      command: () => {
        navigate("/user");
        setActiveItem("/user");
      },
    },
    {
      label: "Product",
      icon: "pi pi-shop",
      command: () => {
        navigate("/product");
        setActiveItem("/product");
      },
    },
  ];

  const filteredItems = getUser?.userType === "SuperAdmin"
    ? allItems
    : allItems.filter(item => item.label === "Dashboard");

  return (
    <div className="sidebar" style={{ width: sidebarWidth }}>
      <h2>Ecommerce </h2>
      <PanelMenu
        model={filteredItems}
        style={{ width: "100%", transition: "width 0.3s" }}
      />
    </div>
  );
};

export default PrimeSidebar;
