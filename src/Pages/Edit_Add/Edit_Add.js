import Adminpagelyout from "../../Lyouts/AdminPage/Adminpagelaout";

import * as React from "react";
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
import BasicModal from "./AddModal";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import Getcategories from '../../Components/getSubcategory'
import EditModal from "./EditModal";
import { edititem } from "../../redux/reducers/Edititem";
function Edit_Add() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch()
  // const [subcategory, setsubcategory] = useState();
  const subcategory = useSelector(state => state.subcategorydata.value)
  const handleChange = (event, value) => {
    setPage(value);
  };
  function productdata(page, items) {
    axios
      .get(`http://localhost:3002/products?_page=${page}&_limit=${items}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteitem(input){
    axios
      .delete(`http://localhost:3002/products/${input}`)
      .then(() => {
        productdata(page, rowsPerPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  useEffect(() => {
    productdata(page, rowsPerPage);
    
  }, [page, rowsPerPage]);
  // console.log(subcategory);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>کالا ها </h1>
        <button style={{ height: "50px", margin: "20px" }}>
          {" "}
          <BasicModal />
        </button>
      </div>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"> نام</TableCell>
              <TableCell align="right">تصویر</TableCell>
              <TableCell align="right">دسته بندی</TableCell>
              <TableCell align="right"></TableCell>
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
                    src={`http://localhost:3002${row.image}`}
                    width="30px"
                  />
                </TableCell>
                <TableCell align="right">
                  {subcategory[row.subcategory]}
                </TableCell>
                <TableCell align="right">
                  <button onClick={()=>dispatch(edititem(row.id))}  ><EditModal   /></button>
                  <button onClick={()=>deleteitem(row.id)} style={{padding:"10px"}}>حذف</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
    
      <Pagination count={10} page={page} dir="ltr" defaultPage={1} onChange={handleChange} />
    </Box>
    </>
  );
}

export default Adminpagelyout(Edit_Add);
