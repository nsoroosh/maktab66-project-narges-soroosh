import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Grid } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function createData(name, price, count) {
    return {name, price, count };
  }
  
  

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: "black" }}>
        بررسی سفارش
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              نام مشتری :
            </Grid>
            <Grid item xs={6}>
              {props.data.name}
            </Grid>
            <Grid item xs={6}>
              ادرس:
            </Grid>
            <Grid item xs={6}>
              {props.data.address}
            </Grid>
            <Grid item xs={6}>
              تلفن:
            </Grid>
            <Grid item xs={6}>
             {props.data.phone}
            </Grid>
            <Grid item xs={6}>
              زمان تحویل:
            </Grid>
            <Grid item xs={6}>
              {props.data.delivery}
            </Grid>
            <Grid item xs={6}>
              زمان سفارش
            </Grid>
            <Grid item xs={6}>
              {props.data.orderDate}
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">نام </TableCell>
            <TableCell align="right">قیمت</TableCell>
            <TableCell align="right">تعداد</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Container sx={{margin:"1rem "}} align="center">
    {props.status==1?<span>زمان تحویل{props.deliveredAt}</span>:<Button variant="contained" onClick={props.setdeliverytime}>تحویل شد</Button>}
    </Container>
        </Box>
      </Modal>
    </div>
  );
}
