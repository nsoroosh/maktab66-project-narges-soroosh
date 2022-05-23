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
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import Editmode from "./editmode";
import { useSelector } from "react-redux";
function Price_Stock() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const stockedititem = useSelector((state) => state.stockedititem.value);
  const newstockvalue = useSelector((state) => state.newstockvalue.value);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function productdata(page, items) {
    axios
      .get(`http://localhost:3002/products?_page=${page}&_limit=${items}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function editTask(id, newName) {
    axios
      .put(`http://localhost:3002/products/${id}`, { price: newName })
      .then((res) => {
        console.log(res);
        // setstockeditmode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    productdata(page, rowsPerPage);
  }, [page, rowsPerPage]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>موجودی و قیمت ها</h1>
        <button
          style={{ height: "50px", margin: "20px" }}
          onClick={() => {
            editTask(stockedititem, newstockvalue);
          }}
        >
          ذخیره
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام</TableCell>
              <TableCell align="right">قیمت</TableCell>
              <TableCell align="right">موجودی</TableCell>
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
                <TableCell align="right">{row.price}</TableCell>
                <Editmode stock={row.count} id={row.id} editTask={editTask} />
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
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          dir="ltr"
        />
      </Box>
    </>
  );
}

export default Adminpagelyout(Price_Stock);
