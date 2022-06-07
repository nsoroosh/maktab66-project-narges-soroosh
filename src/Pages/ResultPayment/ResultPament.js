import React from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import { useParams } from "react-router-dom";
import { render } from "react-dom";
import { Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { api } from "../../Utils/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ResultPament() {
  let params = useParams();
  // const [data, setdata] = useState();
  const [productdata, setproductdata] = useState();
  const navigate = useNavigate();
  const customerdata = JSON.parse(localStorage.getItem("customerinfo"));
  const carditems = JSON.parse(localStorage.getItem("carditems"));
  const purchaseTotal = localStorage.getItem("totalprice");
  const deliveryDate = localStorage.getItem("deliveryDate");
  function sendCustomerData() {
    api
      .post("/orders", {
        customerDetail: customerdata,
        orderNumber: `${parseInt(Math.random() * (10000 - 1000) + 1000)}`,
        purchaseTotal: purchaseTotal,
        orderStatus: "2",
        delivery: `${new Date(deliveryDate).getTime()}`,
        deliveredAt: "",
        orderItems: carditems,
      })
      .then((res) => {
        console.log(res);
        change();
        localStorage.removeItem("carditems");
        localStorage.removeItem("customerinfo");
        localStorage.removeItem("deliveryDate");
        localStorage.removeItem("totalprice");
      })
      .catch((res) => {
        console.log(res);
        navigate("/payment/failed");
      });
  }
  function call(){
    console.log("hello");
  }
  function getproductdata(id, count) {
    api
      .get(`/products/${id}`)
      .then((res) => {
        // console.log(res.data);
        let changedcount = res.data.count;
        changedcount -= count;
        res.data.count = JSON.stringify(changedcount);
        // console.log(res.data);
        const data = res.data;
        api
          .put(`/products/${id}`, data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function change() {
    carditems.forEach((element) => {
      getproductdata(element.id, element.quantity);
    });
  }

  // function timestamp() {
  //   const moonLanding = new Date(`${deliveryDate}`);
  //   const timestamp = moonLanding.getTime();
  //   console.log(`${deliveryDate}`);
  //   return timestamp;
  // }
  // console.log(data);

  useEffect(() => {
    // const delivery = timestamp();
    // setdata({
    //   customerDetail: customerdata,
    //   orderNumber: `${parseInt(Math.random() * (10000 - 1000) + 1000)}`,
    //   purchaseTotal: purchaseTotal,
    //   orderStatus: "2",
    //   delivery: `${delivery}`,
    //   deliveredAt: "",
    //   orderItems: carditems,
    // });
    
      if (params.Resultpayment == "success") {
        sendCustomerData()
      }
    
  }, []);
  if (params.Resultpayment == "success") {
    return (
      <Container sx={{ margin: "3rem auto" }} align="center">
        <Typography variant="h5">
          <CheckCircleIcon sx={{ color: "green" }} fontSize="large" />
          پرداخت موفقیت امیز بود
        </Typography>
      </Container>
    );
  } else if (params.Resultpayment == "failed") {
    return (
      <Container sx={{ margin: "3rem auto" }} align="center">
        <Typography variant="h5">
          <CancelIcon sx={{ color: "red" }} fontSize="large" />
          پرداخت موفقیت امیز نبود
        </Typography>
      </Container>
    );
  }
}

export default Productpagelyout(ResultPament);
