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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { Box, Button } from "@mui/material";
import BasicModal from "./showModal";
function ManageOrders() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [status, setstatus] = useState();
  const handleChange = (event, value) => {
    setPage(value);
  };

  function productdata(page, items, status) {
    axios
      .get(`http://localhost:3002/orders`, {
        params: {
          _page: page,
          _limit: items,
          _sort: "createdAt",
          _order: "desc",
          orderStatus: status,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setdeliverytime(id) {
    try {
      const response = axios({
        method: "patch",
        url: `http://localhost:3002/orders/${id}`,
        data: { deliveredAt: new Date() },
        headers: { "Content-Type": "application/json" },
      }).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    productdata(page, rowsPerPage, status);
  }, [page, rowsPerPage, status]);

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
          <FormControlLabel
            value="سفارش های تحویل شده"
            onClick={() => setstatus(1)}
            control={<Radio />}
            label="سفارش های تحویل شده"
          />
          <FormControlLabel
            value="سفارش های در انتظار ارسال"
            onClick={() => setstatus(2)}
            control={<Radio />}
            label="سفارش های در انتظار ارسال"
          />
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.customerDetail.firstname} {row.customerDetail.lastname}
                </TableCell>
                <TableCell align="right">{row.purchaseTotal}</TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
                <TableCell align="right">
                  <Button variant="contained">
                    {" "}
                    <BasicModal
                      data={{
                        name: `${row.customerDetail.firstname} ${row.customerDetail.lastname}`,
                        address: `${row.customerDetail.address}`,
                        phone: `${row.customerDetail.phone}`,
                        delivery: new Date(row.delivery).toUTCString(),
                        orderDate: `${row.orderDate}`,
                      }}
                      orders={row.orderItems}
                      status={row.orderStatus}
                      deliveredAt={row.deliveredAt}
                      // setdeliverytime={setdeliverytime(row.id)}
                    />{" "}
                  </Button>
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

export default Adminpagelyout(ManageOrders);
