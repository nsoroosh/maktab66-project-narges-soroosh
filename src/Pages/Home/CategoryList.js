import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import FechRows from "./FechRows";
import { useSelector, useDispatch } from "react-redux";
import getdata from "../../redux/reducers/Subcategory"
import { addcategorydata } from "../../redux/reducers/Category1";
import { api } from "../../Utils/axios";

export default function CategoryList() {
  
  const subcategory = useSelector((state) => state.subcategorydata.value);
  
  
  
  return (
    <>
      {subcategory.map((subcategory,index) => (
        <Box>
        <Link
          style={{ display: "block", margin: "1rem 2rem" }}
          to={`/products/${subcategory.id}`}
          key={subcategory.name}
        >
          {subcategory.name}
        </Link>
          <FechRows item={index+1}/>
          </Box>
      ))}
      <Outlet/>
    </>
  );
}
