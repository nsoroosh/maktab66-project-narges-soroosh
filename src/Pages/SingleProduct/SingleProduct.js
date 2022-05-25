import React , {useEffect , useState} from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import BasicBreadcrumbs from "./Breadcrumb";
import { TextField , Button } from "@mui/material";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";
function SingleProduct() {
  let params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true);
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
  console.log(data);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <>
      <div className="uparea">
        <div className="rightarea">
          <img src="" />
        </div>
        <div className="leftarea">
          <h1></h1>
          <BasicBreadcrumbs />
          <h2>تومان</h2>
          <input type={"number"}/>
          <Button variant="contained">افزودن به سبد خرید</Button>
        </div>
      </div>
      <div className="downarea" >
        <Box sx={{backgroundColor:"white"}}>

        </Box>
      </div>
    </>
  );
}
export default Productpagelyout(SingleProduct);
