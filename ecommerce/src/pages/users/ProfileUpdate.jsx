import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const countryData = [
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
  { label: "Canada", value: "Canada" },
  { label: "UK", value: "UK" },
  { label: "Australia", value: "Australia" },
];

const userTypes = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "SuperAdmin"},
];


const validationSchema = Yup.object().shape({
  userType: Yup.string().required("Uers Type is required"),
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string().required("Mobile is required"),
  password: Yup.string().required("Password is required"),
  // address: Yup.string().required("Address is required"),
  // country: Yup.string().required("Country is required"),
  // pincode: Yup.string().required("Pincode is required"),
});

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [User, setUser] = useState(null);
  const [error, setError] = useState(null);

  const userProfile = JSON.parse(localStorage.getItem('authUser'));

  console.log("checkkuser",userProfile)
  const initialValues = {
    userType: userProfile?.userType || "",
    fullName: userProfile?.username || "",
    email: userProfile?.email || "",
    phoneNumber: userProfile?.phoneNumber || "",
    password: "",
    address: userProfile?.address || "",
    country: userProfile?.country || "",
    pincode: userProfile?.pincode || "",
  };

  const headerTitle = "Profile Update";
  const handleSubmit = (values) => {
    console.log("Form values:", values);

    const updateUrl =
      "http://localhost:4343/api/update";
      
    const data = {
      userId: userProfile?.userId || "",
      userType:  values?.userType || userProfile?.userType,
      username: values?.fullName || userProfile?.fullName,
      email: values?.email || userProfile?.email,
      phoneNumber: values?.phoneNumber || userProfile?.phoneNumber,
      password: values?.password,
      address: values?.address || userProfile?.address,
      country: values?.country || userProfile?.country,
      pincode: values?.pincode || userProfile?.pincode,
    };

    const apiUrl =  updateUrl;

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("Response:", response);
        setUser(response.data);
        toast.success(
         "profile updated successfully!"   
        );
        console.log("data", response.data.data);
        localStorage.setItem('authUser', JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        toast.error("Error creating profile. Please try again.");
      });
  };

  return (
    <div className="p-mt-4 p-px-4">
      <Panel header={headerTitle} style={{ marginTop: "20px" }}>
        <Card>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-container">
                <div className="field-wrapper">
                   <div> <label htmlFor="userType">User Type</label><span>*</span></div>
                    <Field
                      name="userType"
                      render={({ field }) => (
                        <Dropdown
                          id="userType"
                          {...field}
                          options={userTypes}
                          onChange={(e) => setFieldValue("userType", e.value)}
                          placeholder="Select a user Type"
                          className="input-field"
                        />
                      )}
                    />
                    <ErrorMessage
                      name="userType"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                  <div><label htmlFor="fullName">Full Name</label><span>*</span></div>                  
                    <Field
                      name="fullName"
                      as={InputText}
                      id="fullName"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <div><label htmlFor="email">Email</label><span>*</span></div>    
                    <Field
                      name="email"
                      as={InputText}
                      id="email"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <div><label htmlFor="phoneNumber">Mobile</label><span>*</span></div>    
                    <Field
                      name="phoneNumber"
                      as={InputText}
                      id="phoneNumber"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <div><label htmlFor="password">Password</label><span>*</span></div>  
                    <Field
                      name="password"
                      as={InputText}
                      id="password"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="address">Address</label>
                    <Field
                      name="address"
                      as={InputText}
                      id="address"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="country">Country</label>
                    <Field
                      name="country"
                      render={({ field }) => (
                        <Dropdown
                          id="country"
                          {...field}
                          options={countryData}
                          onChange={(e) => setFieldValue("country", e.value)}
                          placeholder="Select a country"
                          className="input-field"
                        />
                      )}
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="pincode">Pincode</label>
                    <Field
                      name="pincode"
                      as={InputText}
                      id="pincode"
                      className="p-inputtext input-field"
                    />
                    <ErrorMessage
                      name="pincode"
                      component="div"
                      className="p-error"
                    />
                  </div>

                  <div className="submitbtn">
                    <Button
                      type="submit"
                      label="Submit"
                      className="p-mt-2 primary-button"
                    />
                    <Button
                      type="button"
                      label="Cancel"
                      className="p-mt-2 secondary-button"
                      onClick={() => navigate("/User")}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
        <ToastContainer />
      </Panel>
    </div>
  );
};

export default ProfileUpdate;
