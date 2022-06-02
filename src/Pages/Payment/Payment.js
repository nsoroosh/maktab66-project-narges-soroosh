import { Button, Typography } from "@mui/material";
import {api} from "../../Utils/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";

function Payment() {
  const [data, setdata] = useState();
  const [productdata, setproductdata] = useState();
  const navigate = useNavigate();
  const customerdata = useSelector((state) => state.edititem.value);
  const carditems = JSON.parse(localStorage.getItem("carditems"));
  function sendCustomerData() {
    api
      .post("/orders", data)
      .then((res) => {
        console.log(res);
        change()
        localStorage.removeItem("carditems")
        navigate('/payment/sucsess')
      })
      .catch((res) => {
        console.log(res);
        navigate("/payment/failed");
      });
  }
  function getproductdata(id, count) {
    api
      .get(`/products/${id}`)
      .then((res) => {
        console.log(res.data);
        let changedcount = res.data.count;
        changedcount -= count;
        res.data.count = JSON.stringify(changedcount);
        console.log(res.data);
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
function change(){
  carditems.forEach(element => {
    getproductdata(element.id,element.quantity)
  

  })
}
  
  function timestamp() {
    const moonLanding = new Date(`${customerdata.date}`);
    const timestamp = moonLanding.getTime();
    return timestamp;
  }
  // console.log(data);

  useEffect(() => {
    // change()
    const delivery = timestamp();
    setdata({
      customerDetail: customerdata,
      orderNumber: `${parseInt(Math.random() * (10000 - 1000) + 1000)}`,
      orderDate: `${Date.now().getTime()}`,
      purchaseTotal: `${carditems.purchaseTotal}`,
      orderStatus: "2",
      delivery: `${delivery}`,
      deliveredAt: "",
      orderItems: carditems,
    });
    console.log(productdata);
  }, []);

  return (
    <>
      <Typography variant="h5" component="h3">
        میخواهید پرداخت کنید ؟
      </Typography>
      <Button variant="contained" onClick={sendCustomerData}>
        بله
      </Button>
      <Button variant="contained" onClick={() => navigate("/payment/failed")}>
        خیر
      </Button>
    </>
  );
}
export default Productpagelyout(Payment);
