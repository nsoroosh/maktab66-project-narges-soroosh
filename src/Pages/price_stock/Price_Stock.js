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
import { Box } from "@mui/material";
import PriceEditmode from "./priceEditmode";
import CountEditmode from "./countEditmode";
function Price_Stock() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editdata, seteditdata] = useState();
  const [editId, seteditId] = useState()
  const handleChange = (event, value) => {
    setPage(value);
  };
  function productdata(page, items) {
    axios
      .get(`http://localhost:3002/products`, {params:{
        _page:`${page}`,
        _limit:`${items}`,
        _sort:"createdAt",
        _order:"desc",
        // orderStatus:`${status}`
      }})
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function editTask(id,data) {
    axios
      .put(`http://localhost:3002/products/${id}`, data)
      .then((res) => {
        console.log(res);
        // setstockeditmode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changeprice = (input) => {
    seteditdata({
      price: input,
    });
  };
  const changecount = (input) => {
    seteditdata({
      count: input,
    });
  };
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
            // editTask();
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
                <TableCell component="th" scope="row" align="right">
                  <PriceEditmode
                    value={row.price}
                    data={
                      {
                        image: row.image,
                        name: row.name,
                        artist: row.artist,
                        price: row.price,
                        count: row.count,
                        description: row.description,
                        subcategory: row.subcategory,
                      }}
                    changeprice={editTask}
                    id={row.id}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <CountEditmode
                    value={row.count}
                    data={
                      {
                        image: row.image,
                        name: row.name,
                        artist: row.artist,
                        price: row.price,
                        count: row.count,
                        description: row.description,
                        subcategory: row.subcategory,
                      }
                    }
                    
                    changecount={editTask}
                    id={row.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Pagination
          count={10}
          page={page}
          dir="ltr"
          defaultPage={1}
          onChange={handleChange}
        />
      </Box>
    </>
  );
}

export default Adminpagelyout(Price_Stock);
