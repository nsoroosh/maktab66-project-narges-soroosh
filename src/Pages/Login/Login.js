import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoken } from "../../redux/reducers/TokenSlice";
import userLogin from "./userLogin";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import './login.scss'
const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  // console.log(userToken);
  return tokenString;
};
console.log();


function Register() {
  const navigate = useNavigate();
  const authenticate = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  return (
    <>
      

      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "لطفا نام کاربری خود را وارد کنید ";
          }
          if (!values.password) {
            errors.password = "لطفا رمز عبور  خود را وارد کنید";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          
            userLogin(values.username, values.password);
            dispatch(addtoken(getToken()));
            navigate("/admin");
            setSubmitting(false);
          
           console.log("hello")
         
        }}
      >
        {({ isSubmitting }) => (
            <Form className="form-signin">
            <h2 className="form-signin-heading"> وارد شوید </h2>
              <div className="loginform" >
                <div class="form-control">
                  <label htmlFor="username">نام کاربری   </label>
                  <Field type="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div class="form-control">
                  <lable htmlFor="password">رمز عبور</lable>
                  <Field type="password" name="password" />
                  <ErrorMessage className="errormassage" name="password" component="div" />
                </div>
                <div className="submit">
                  <button type="submit" class="submitbuton" >
                    ورود
                  </button>
                </div>
              </div>
            </Form>
        )} 
      </Formik>
    </>
  );
}

export default Productpagelyout(Register);
