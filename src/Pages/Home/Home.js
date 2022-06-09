import React , {useEffect , useState} from "react";
import { useDispatch } from "react-redux";
import { api } from "../../Utils/axios";
import { getdata } from "../../redux/reducers/Subcategory";
import { SimpleSlider } from "./Slider";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import CategoryList from "./CategoryList";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import "./Home.css";
import ActionAreaCard from "./Card";


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
  return(
    <CategoryList/>

  )
}
export default Productpagelyout(Home);
