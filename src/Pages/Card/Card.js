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
import {api} from "../../Utils/axios";
import Pagination from "@mui/material/Pagination";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { maxHeight } from "@mui/system";
const Card = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [totalprice, settotalprice] = useState();
  const [inputValue, setinputValue] = useState(2);
  const [productData, setproductData] = useState(1)
  const carditems = JSON.parse(localStorage.getItem("carditems"));
   function getproductdata() {
    try {
      const response =  api
        .get(`/products`)
        .then((res) => {
          console.log(res.data);
          setproductData(res.data);
          // setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(totalprice);
  function redirect() {
    navigate("/customerinfo");
  }
  function finalprice(count, price) {
    return count * price;
  }
  function calctotalprice() {
  let  price=0
    for (const item of carditems) {
      finalprice=item.price*item.quantity
      price=price+finalprice
    }
    settotalprice(price)
    localStorage.setItem("totalprice",price)
  }
  function deleteitem(input) {
    let index = carditems.findIndex((res) => res.id == input);

    let result = carditems.splice(index, 1);
    localStorage.setItem("carditems", JSON.stringify(carditems));
    setdata(carditems);
    console.log(result);
  }
  function minesbutt(id) {
    let index = carditems.findIndex((res) => res.id == id);
    if(carditems[index].quantity>1){
      
      carditems[index].quantity -= 1;
    }
    console.log(carditems);
    localStorage.setItem("carditems", JSON.stringify(carditems));
    setdata(carditems[index].quantity)

  }
  function addbutt(id) {
    let index = carditems.findIndex((res) => res.id == id);
    if(carditems[index].quantity<=productData[id].count){
      
      carditems[index].quantity += 1;
    }
    console.log(carditems);
    localStorage.setItem("carditems", JSON.stringify(carditems));
    setdata(carditems[index].quantity)

  }
  
  useEffect(() => {
    if(carditems){

      calctotalprice()
    }
    getproductdata()
  }, [data]);
  console.log(productData);
  if (!carditems || carditems.length == 0) {
    return (
      <Typography variant="h3" component="h2" sx={{ margin: "9rem " }}>
        سبد خرید شما خالی است!
      </Typography>
    );
  }
  return (
    <>
      <Typography variant="h3" component="h3">
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
            {carditems.map((row) => (
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
                <TableCell align="right">
                  <button variant="contained" sx={{borderRadius:"50%"}}>
                  <RemoveIcon 
                    onClick={() => minesbutt(row.id)}
                  />
                  </button>
                  
                  <TextField
                    type="text"
                    value={row.quantity}
                    size='small'
                    sx={{ maxWidth: "3rem"  }}
                  />
                  <button variant="contained">

                  <AddIcon onClick={()=>addbutt(row.id)} />
                  </button>
                </TableCell>
                <TableCell align="right">
                  {finalprice(row.price, row.quantity)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => deleteitem(row.id)}
                  >
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="h5" variant="h5">
        مجموع مبلغ :{totalprice}
      </Typography>
      <Button variant="contained" onClick={() => redirect()}>
        نهایی کردن سبد خرید
      </Button>
    </>
  );
};

export default Productpagelyout(Card);
