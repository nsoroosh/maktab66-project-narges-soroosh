import React from 'react'
import Productpagelyout from '../../Lyouts/ProductPage/Productpagelyout' 
import { useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { Typography } from '@mui/material';
 function ResultPament() {
  let params = useParams();
  // if({params.Resultpayment}=="sucsess"){
  //    render(
  //      <Typography variant='h5'>
  //        پرداخت موفقیت امیز بود
  //      </Typography>
  //    )
  // }else if(params.Resultpayment=="failed"){
  //   return (
  //     <Typography variant='h5'>
  //        پرداخت موفقیت امیز نبود
  //      </Typography>
  //   )
  // }
  return <h1> {params.Resultpayment}</h1>;
  
}

export default Productpagelyout(ResultPament)