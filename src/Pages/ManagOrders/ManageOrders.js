import Adminpagelyout from '../../Lyouts/AdminPage/Adminpagelaout'


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RadioButtonsGroup from './RadioButton';
import { Box } from '@mui/material';
 function ManageOrders() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(1)
   function productdata(page,items){
    axios.get(`http://localhost:3002/orders?_page=${page}&_limit=${items}`)
    .then(res => { 
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                 })
    .catch(err => {
                    console.log(err);
                  });
   }
  useEffect(() => {
   productdata(count,6)
 }, []); 
 
  console.log(count)
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
    <RadioButtonsGroup/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> نام کاربر</TableCell>
            <TableCell align="right">مجموع مبلغ</TableCell>
            <TableCell align="right">زمان ثبت سفارش </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.customerDetail.firstName} {row.customerDetail.lastName}
              </TableCell>
              <TableCell align="right">{row.purchaseTotal}</TableCell>
              <TableCell align="right">{row.orderDate}</TableCell>
              <TableCell align="right">
                 <button>بررسی سفارش</button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
    </TableContainer>
    <Box>
    <button onClick={() => setCount(count - 1)}>
        <ArrowBackIosNewIcon />
      </button>
      <button onClick={() => setCount(count + 1)}>
        <ArrowForwardIosIcon/>
      </button>
    </Box>
    </>
  );
}

export default Adminpagelyout(ManageOrders)