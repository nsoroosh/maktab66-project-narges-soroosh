import React, { useEffect, useState } from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import BasicBreadcrumbs from "./Breadcrumb";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import FechRows from "../Home/FechRows";
import { Box, margin } from "@mui/system";
function SingleProduct() {
  let params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const subcategory = useSelector((state) => state.subcategorydata.value);
  const categories = useSelector((state) => state.categories.value);
const [count, setcount] = useState()
  async function productdata(input) {
    try {
      const response = await axios
        .get(`http://localhost:3002/products`)
        .then((res) => {
          const productdata = res.data.filter((value) => value.name == input);
          setData(productdata);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  function handlechangenumber(event){
      setcount(event.target.value)
  }
  function finalprice(count,price){
     return count*price
  }
  const carditems = JSON.parse( localStorage.getItem("carditems"))
function addtocard(){
  localStorage.setItem("carditems", JSON.stringify([...carditems,{
    name:`${data[0].name}`,
    thumbnail:`${data[0].thumbnail}`,
    price:`${data[0].price}`,
    quantity:count,
    finalprice:count*data[0].price
  }]))
}
console.log(carditems);
  useEffect(() => {
    productdata(params.productId);
  }, []);
  // console.log(data[0]);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7}>
            <img
              src={`http://localhost:3002${data[0].image}`}
              style={{ borderRadius: "2px", margin: "1rem" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <h1>{data[0].name}</h1>
            <BasicBreadcrumbs
              category={categories[1]}
              subcategory={subcategory[data[0].subcategory]}
              subcategoryId={data[0].subcategory}
              name={data[0].name}
            />
            <h2>تومان{data[0].price}</h2>
            
           {(data[0].count)==0?<h5>اتمام موجودی</h5>:<TextField
              type="number"
              InputProps={{
                inputProps: {
                  max: `${data[0].count}`,
                  min: 0,
                },
              }}
              onChange={handlechangenumber}
            />}
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4caf50", margin: "1rem" }}
              onClick={addtocard}
            >
              افزودن به سبد خرید
            </Button>
          </Grid>
        </Grid>
      </Box>

      <div className="downarea">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          {data[0].description}
        </Box>
      </div>
      <div>
        <h3>محصولات مشابه</h3>
        <FechRows item={data[0].subcategory} />
      </div>
    </>
  );
}
export default Productpagelyout(SingleProduct);
