import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import FechRows from "./FechRows";
import { useSelector, useDispatch } from "react-redux";
import getdata from "../../redux/reducers/Subcategory"
import { addcategorydata } from "../../redux/reducers/Category1";
import { api } from "../../Utils/axios";

export default function CategoryList() {
  const dispatch = useDispatch();
  const [data, setdata] = useState()
  const subcategory = useSelector((state) => state.subcategorydata.value);
  function apicall(){
    api.get("/subcategory").then(res=>{
      console.log(res.data)
      setdata(res.data)
    }).catch(res=>console.log(res))
  }
  useEffect(() => {
    apicall()
  }, [])
  // dispatch(getdata(data))
  console.log(data);
  
  
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
