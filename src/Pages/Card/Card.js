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
  const [totalprice, settotalprice] = useState(0);
  const [inputValue, setinputValue] = useState(2);
  const carditems = JSON.parse(localStorage.getItem("carditems"));
  function redirect() {
    navigate("/customerinfo");
  }
  function finalprice(count, price) {
    return count * price;
  }
  function calctotalprice(input) {
    for (let index = 0; index < carditems.length; index++) {
      settotalprice(totalprice + input);
    }
  }
  function deleteitem(input) {
    let index = carditems.findIndex((res) => res.id == input);

    let result = carditems.splice(index, 1);
    localStorage.setItem("carditems", JSON.stringify(carditems));
    setdata(carditems);
    console.log(result);
  }
  function minesbutt() {
    setinputValue(inputValue - 1);
  }
  function addbutt() {
    setinputValue(inputValue + 1);
  }
  function handleChange(input) {
    let index = carditems.findIndex((res) => res.id == input);
    carditems[index].quantity = inputValue;
    console.log(carditems);
    localStorage.setItem("carditems", JSON.stringify(carditems));
    // setdata(carditems)
  }
  useEffect(() => {
    calctotalprice();
  }, [data]);

  if (!carditems || carditems == []) {
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
                  <button variant="contained">
                  <RemoveIcon
                    onClick={() => minesbutt(row.id)}
                  />
                  </button>
                  
                  <input
                    type="text"
                    value={inputValue}
                    style={{ maxWidth: "2rem" , height:'2rem' }}
                    onChange={handleChange(row.id)}
                  />
                  <button variant="contained">

                  <AddIcon onClick={addbutt} />
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
