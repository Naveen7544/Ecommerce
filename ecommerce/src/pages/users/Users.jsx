import React, { useState, useEffect } from 'react';
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import PrimeTable from "../../components/PrimeTable";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Users = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const [error, setError] = useState(null);

  const columns = [
    { field: "username", header: "Name", sortable: true },
    { field: "email", header: "Email", sortable: true },
    { field: "phoneNumber", header: "Moble", sortable: true },
    { field: "userType", header: "User Type", sortable: true },
  ];

  useEffect(() => {
    getCustomer()
  }, []); 

  
  const getCustomer = () => {
    let apiUrl = 'http://localhost:4343/api/user';
    const token = localStorage.getItem('token');
    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }
  
  const handleNewItemClick = () => {
    navigate("/create-user");
  };

  const handleEdit = (rowData) => {
    console.log('rowDatawwwee', rowData);
    navigate(`/edit-user/${rowData.userId}`,{ state: { rowData } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4343/api/deleteuser/${id}`);
      console.log('rowDatawww', response);
      toast.success(response?.data.message);
      getCustomer()
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  

  return (
    <div className="p-mt-4 p-px-4">
      <Panel header="User" style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            label="Add User"
            icon="pi pi-plus"
            severity="success"
            onClick={handleNewItemClick}
          />
        </div>

        <Card>
          <PrimeTable
            columns={columns}
            usersData={User}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={false}
          />
        </Card>
        <ToastContainer />
      </Panel>
      
    </div>
  );
};

export default Users;
