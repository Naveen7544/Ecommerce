import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginPage.css";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    mobile: "",
    isSignUp: true,
  };

  const validationSchemaSignup = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    mobile: Yup.string().required("Mobile number is required"),
    })

    const validationSchemaLogin = Yup.object().shape({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      })

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (values.isSignUp) {
        const response = await axios.post("http://localhost:4343/api/signup", {
          uerType:"user",
          username: values.userName,
          email: values.email,
          password: values.password,
          phoneNumber: values.mobile,
        });
        console.log(response.data);
        document.body.classList.add("login-body");
      } else {
        const response = await axios.post("http://localhost:4343/api/login", {
          email: values.email,
          password: values.password,
        });
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem('authUser', JSON.stringify(response.data.data));
        setIsAuthenticated(true);
        toast.success("Login successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
    setSubmitting(false);
  };

  React.useEffect(() => {
    document.body.classList.add("login-body");
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  return (
    <div className="main">
      <input className="input-login" type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <Formik
          initialValues={{ ...initialValues, isSignUp: true }}
          validationSchema={validationSchemaSignup}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label className="label-btn" htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <Field id="input-login" type="text" name="userName" placeholder="User name" />
              <ErrorMessage
                name="userName"
                component="div"
                className="error-message"
              />
              <Field id="input-login" type="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
              <Field id="input-login" type="password" name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
              <Field id="input-login" type="text" name="mobile" placeholder="Mobile" />
              <ErrorMessage
                name="mobile"
                component="div"
                className="error-message"
              />
              <Field type="hidden" name="isSignUp" value={true} />
              <button className="sb-btn" type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="login">
        <Formik
          initialValues={{ ...initialValues, isSignUp: false }}
          validationSchema={validationSchemaLogin}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label className="label-btn" htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <Field id="input-login" type="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
              <Field id="input-login" type="password" name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
              <Field type="hidden" name="isSignUp" value={false} />
              <button className="sb-btn" type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
