import React from 'react'
import {api} from "../../Utils/axios";
async function userLogin(username,password) {
  
    return api.post('/auth/login', {
      username:username,
      password:password
    })
    // .then(function (response) {
    //   localStorage.setItem('token', JSON.stringify(response.data.token));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
   }
export default userLogin   

   