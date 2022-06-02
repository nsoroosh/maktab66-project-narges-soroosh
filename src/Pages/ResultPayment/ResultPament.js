import React from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import { useParams } from "react-router-dom";
import { render } from "react-dom";
import { Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
function ResultPament() {
  let params = useParams();

  if (params.Resultpayment == "sucsess") {
    return (
      <Container sx={{ margin: "3rem auto" }} align="center">
        <Typography variant="h5">
          <CheckCircleIcon sx={{ color: "green" }}  fontSize="large" />
          پرداخت موفقیت امیز بود
        </Typography>
      </Container>
    );
  } else if (params.Resultpayment == "failed") {
    return (
      <Container sx={{ margin: "3rem auto" }} align="center">
        <Typography variant="h5">
          <CancelIcon sx={{ color: "red"}} fontSize="large"  />
          پرداخت موفقیت امیز نبود
        </Typography>
        
      </Container>
    );
  }
}

export default Productpagelyout(ResultPament);
