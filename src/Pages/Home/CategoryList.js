import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import FechRows from "./FechRows";
import { useSelector, useDispatch } from "react-redux";

import { addcategorydata } from "../../redux/reducers/Category1";

export default function CategoryList() {
  const dispatch = useDispatch();
  const subcategory = useSelector((state) => state.subcategorydata.value);
  
  
  return (
    <>
      {subcategory.map((subcategory,index) => (
        <Link
          style={{ display: "block", margin: "1rem 2rem" }}
          to={`/products/${index+1}`}
          key={subcategory}
        >
          {subcategory}
          <FechRows item={index+1}/>
        </Link>
      ))}
      <Outlet/>
    </>
  );
}
