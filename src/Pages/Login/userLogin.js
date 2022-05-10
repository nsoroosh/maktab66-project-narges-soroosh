import React from 'react'
import axios from 'axios'
async function userLogin(username,password) {
    return axios.post('http://localhost:3002/auth/login', {
      username:username,
      password:password
    })
    .then(function (response) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
    })
    .catch(function (error) {
      console.log(error);
    });
   }
export default userLogin   


