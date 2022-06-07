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
import {api} from "../../Utils/axios";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { CircularProgress } from "@mui/material";
import { Box, Button } from "@mui/material";
import BasicModal from "./showModal";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
function ManageOrders() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [status, setstatus] = useState();
  const [changeitem, setchangeitem] = useState()
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const access_token = localStorage.getItem("token")
  const handleChange = (event, value) => {
    setPage(value);
  };

  function productdata(page, items, status) {
    api
      .get(`/orders`, {
        params: {
          _page: page,
          _limit: items,
          _sort: "createdAt",
          _order: "desc",
          orderStatus: status,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setdeliverytime(id) {
  const orderdata=  data.find(res=>res.id==id)
      let  timestamp=new Date().getTime()
        orderdata.deliveredAt =timestamp
        orderdata.orderStatus=1
        const senddata = orderdata;
        api
          .put(`/orders/${id}`, senddata)
          .then((res) => {
            console.log(res);
            handleClick()
            setchangeitem(res.data.id)
          })
          .catch((err) => {
            console.log(err);
          });
      
  }

  useEffect(() => {
    // setdeliverytime(17)
    productdata(page, rowsPerPage, status);
  }, [page, rowsPerPage, status,changeitem]);

  if (isLoading) {
    return <CircularProgress />

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
            value="1"
            onClick={() => setstatus(1)}
            control={<Radio />}
            label="سفارش های تحویل شده"
          />
          <FormControlLabel
            value="2"
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
                  {console.log(row)}
                  {row.customerDetail.firstname} {row.customerDetail.lastname}
                </TableCell>
                <TableCell align="right">{row.purchaseTotal}</TableCell>
                <TableCell align="right"> {new Date(+row.createdAt).toLocaleString("fa")}</TableCell>
                <TableCell align="right">
                  <Button variant="contained">
                    {" "}
                    <BasicModal
                      data={{
                        name: `${row.customerDetail.firstname} ${row.customerDetail.lastname}`,
                        address: `${row.customerDetail.address}`,
                        phone: `${row.customerDetail.phone}`,
                        delivery: new Date(+row.delivery).toLocaleString("fa"),
                        orderDate:new Date(+row.createdAt).toLocaleString("fa"),
                      }}
                      orders={row.orderItems}
                      status={row.orderStatus}
                      deliveredAt={new Date(+row.deliveredAt).toLocaleString("fa")}
                      setdeliverytime={()=>setdeliverytime(row.id)}
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="تاریخ ارسال ثبت شد"
        action={action}
      />
    </>
  );
}

export default Adminpagelyout(ManageOrders);









// moment(row.delivery).format('LT').format("YYYY MM DD") 