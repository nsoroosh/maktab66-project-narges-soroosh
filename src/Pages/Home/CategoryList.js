import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ActionAreaCard from "./Card";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";

export default function CategoryList() {
  const subcategory = useSelector((state) => state.data.value);

  return (
    <>
      <div class="container">
        {subcategory.map((res) => {
          <Link to="">{res}</Link>;
        })}

        <div class="row">
          <div class="card">
            <ActionAreaCard />
          </div>
          <div class="card">
            <ActionAreaCard />
          </div>
          <div class="card">
            <ActionAreaCard />
          </div>
          <div class="card">
            <ActionAreaCard />
          </div>
        </div>
      </div>
    </>
  );
}
