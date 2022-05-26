import React , {useEffect , useState} from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import BasicBreadcrumbs from "./Breadcrumb";
import { TextField , Button } from "@mui/material";
import { useNavigate , useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios";
import FechRows from "../Home/FechRows";
import { Box, margin } from "@mui/system";
function SingleProduct() {
  let params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true);
  const subcategory = useSelector((state) => state.subcategorydata.value);
  const categories =  useSelector((state) => state.categories.value);

  


  async function productdata(input) {
    try {
      const response = await axios
        .get(`http://localhost:3002/products`)
        .then((res) => {
          const productdata = res.data.filter(
            (value) => value.name == input
          );
          setData(productdata);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productdata(params.productId);
  }, []);
  console.log(data[0]);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <img src={`http://localhost:3002${data[0].image}`}  style={{borderRadius:'2px', margin:'1rem'}}/>
            
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <h1>{data.name}</h1>
          <BasicBreadcrumbs category={categories[1]} subcategory={subcategory[data[0].subcategory]} subcategoryId={data[0].subcategory} name={data[0].name}/>
          <h2>تومان{data[0].price}</h2>
          <input type={"number"} style={{width:'2rem'}}/>
          <Button variant="contained" sx={{backgroundColor:'#4caf50' , margin:'1rem'}}>افزودن به سبد خرید</Button>

        </Grid>
      </Grid>
    </Box>
      
      <div className="downarea" >
        <Box sx={{backgroundColor:"white" , borderRadius:'12px', margin:'1rem' , padding:'1rem'}}>
           {data[0].description}
        </Box>
      </div>
      <div>
        <h3>محصولات مشابه</h3>
        <FechRows item={data[0].subcategory}/>
      </div>
    </>
  );
}
export default Productpagelyout(SingleProduct);
