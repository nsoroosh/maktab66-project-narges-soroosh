import React , {useEffect , useState} from "react";
import { useDispatch } from "react-redux";
import { api } from "../../Utils/axios";
import { getdata } from "../../redux/reducers/Subcategory";
import { SimpleSlider } from "./Slider";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import CategoryList from "./CategoryList";
import { Container, Link } from "@mui/material";
import { useSelector } from "react-redux";
import "./Home.css";
import ActionAreaCard from "./Card";
import header from "../../Assets/images/Header_28_Low_Res.jpg";
import mobile from "../../Assets/images/TPC_Artwall_03.jpeg"

import { Box } from "@mui/system";
import { Grid } from "@mui/material";
function Home() {
  const dispatch = useDispatch();
  const [data, setdata] = useState()
  function apicall(){
    api.get("/subcategory").then(res=>{
      console.log(res.data)
      setdata(res.data)
    }).catch(res=>console.log(res))
  }
  useEffect(() => {
    apicall()
    // dispatch(getdata(data))
  }, [])
  console.log(data);
  return(<>
  
  <Box >
  <picture>
   <source media="(max-width: 400px)" style={{width:"100%"}} srcset={mobile} />
   <source media="(max-width: 1200px)" srcset={header} style={{width:"100%"}}/>
<img src={header} style={{width:"100%"}}/>
</picture>
    </Box>
  {/* <Box
    component="img"
    sx={{
        content: {
            xs: `${header}`, //img src from xs up to md
            lg: `${mobile}`,  //img src from md and up
        }
    }}
    alt="Logo"
/> */}
    <CategoryList/>
</>
  )
}
export default Productpagelyout(Home);
