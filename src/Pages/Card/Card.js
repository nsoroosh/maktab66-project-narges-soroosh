import React from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
const Card = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("carditems"));
  // const totalprice = data.map(res=>{
  //   const total = 0
  //   total+=res.finalprice
  //   return total
  // })
  function redirect (){
    navigate("/customerinfo")
  }
  // function deleteitem(input){
  // const result=  data.filter(res=>res.name!=input)
  //   localStorage.setItem('carditems',result)
  // }
  if (!data) {
    return <Typography variant="h3" component="h2" sx={{margin:"9rem "}}>سبد خرید شما خالی است!</Typography>;
  }
  return (
    <>
    <Typography variant="h3" component='h3'>
      سبد خرید
    </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"> نام</TableCell>
              <TableCell align="right">تصویر</TableCell>
              <TableCell align="right">فیمت </TableCell>
              <TableCell align="right">تعداد</TableCell>
              <TableCell align="right">مجموع مبلغ</TableCell>
              <TableCell align="right"> </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3002${row.thumbnail}`}
                    width="30px"
                  />
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.finalprice}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" >حذف</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="h5" variant="h5" onClick={()=>redirect()}>
        مجموع مبلغ :
      </Typography>
      <Button variant="contained">نهایی کردن سبد خرید</Button>
    </>
  );
};

export default Productpagelyout(Card);
