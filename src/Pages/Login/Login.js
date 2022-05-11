import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { addtoken } from '../../redux/reducers/TokenSlice';
import userLogin from './userLogin';
import styled from '@emotion/styled';

const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};
const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;
function Register () {
  const navigate = useNavigate()
  const authenticate = useSelector(state => state.token.value)
  const dispatch = useDispatch()
  return (
    <>
    <h1>Sign in</h1>
  
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
        <Wrapper>
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
        </Wrapper>
      )}
    </Formik>
 
  </>
  )
}

export default Register;