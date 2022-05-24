import React from "react";
import { SimpleSlider } from "./Slider";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import CategoryList from "./CategoryList";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import "./Home.css";
import ActionAreaCard from "./Card";


function Home() {
  return(
    <CategoryList/>

  )
}
export default Productpagelyout(Home);
