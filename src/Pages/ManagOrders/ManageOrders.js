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
import TablePagination from '@mui/material/TablePagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Box } from '@mui/material';
 function ManageOrders() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [status, setstatus] = useState()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
   function productdata(page,items){
    axios.get(`http://localhost:3002/orders?_page=${page}&_limit=${items}`)
    .then(res => { 
      const response = res.data.filter(res=>res.orderStatus==status)
      console.log(res.data);
      console.log(response);

                    setData(res.data);
                    setLoading(false);
                 })
    .catch(err => {
                    console.log(err);
                  });
   }
  useEffect(() => {
   productdata(page,rowsPerPage)
 }, [page,rowsPerPage]); 
 
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        row
      >
        <FormControlLabel  value="سفارش های تحویل شده" onClick={()=>setstatus(1)} control={<Radio />} label="سفارش های تحویل شده" />
        <FormControlLabel value="سفارش های در انتظار ارسال" onClick={()=>setstatus(3)} control={<Radio />} label="سفارش های در انتظار ارسال" />
      </RadioGroup>
    </FormControl>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"> نام کاربر</TableCell>
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
              <TableCell component="th" scope="row" align="right">
                {row.customerDetail.firstname} {row.customerDetail.lastname}
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
    
    <TablePagination
        component="div"
        count={50}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        dir="ltr"
      />
    </Box>
    </>
  );
}

export default Adminpagelyout(ManageOrders)