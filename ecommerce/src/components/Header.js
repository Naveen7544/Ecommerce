import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../store/slices/cartSlice';

const PrimeHeader = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const handleOpenCart = (open) => {
      dispatch(toggleCart(open));
  };
    const cartQuantity = cartItems.length;

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('authUser');
      navigate("/login");
    };

    const profileUpdate = () => {
      navigate("/profile-update");
    };

  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        { label: "New", icon: "pi pi-fw pi-plus" },
        { label: "Open", icon: "pi pi-fw pi-external-link" },
        { label: "Quit", icon: "pi pi-fw pi-times" }
      ]
    },
  ];

  const endMenu = useRef(null);
  const profileMenuItems = [
    { label: "Profile Update", icon: "pi pi-fw pi-plus", command: profileUpdate },
    { label: "Settings", icon: "pi pi-fw pi-user-edit" },
    { label: "Log Out", icon: "pi pi-fw pi-sign-out", command: logout }
  ];

  const end = (
  <div>
   <Menu model={profileMenuItems} popup ref={endMenu} />
      <div className="flex align-items-center gap-4">
      <Button icon="pi pi-shopping-cart" className="p-button-rounded p-button-secondary" 
      onClick={() => handleOpenCart(true)}  style={{marginRight:"5px"}}/>
       {cartQuantity > 0 && (
          <Badge value={cartQuantity} severity="danger" style={{ position: 'absolute', top: '2px', right: '48px' }} onClick={() => handleOpenCart(true)}/>
        )}
      <Button icon="pi pi-user" className="p-button-rounded p-button-secondary" onClick={(event) => endMenu.current.toggle(event)} />
    </div>
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} end={end} />
    </div>
  );
};

export default PrimeHeader;
