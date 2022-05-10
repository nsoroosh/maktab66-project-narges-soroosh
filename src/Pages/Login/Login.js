import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { addtoken } from '../../redux/reducers/TokenSlice';
import userLogin from './userLogin';


const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};

function Register () {
  const navigate = useNavigate()
  const authenticate = useSelector(state => state.token.value)
  const dispatch = useDispatch()
  return (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          userLogin(values.username,values.password)
          setSubmitting(false);
        }, 400);

        dispatch(addtoken(getToken()))
        navigate('/admin')
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="username" name="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <button  onClick={()=>navigate("/")}>cancel</button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Register;