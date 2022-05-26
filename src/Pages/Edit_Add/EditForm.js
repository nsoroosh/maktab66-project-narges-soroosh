import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function UploadForm() {
  const id = useSelector((state) => state.edititem.value);
  const [description, setdescription] = useState();
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [count, setcount] = useState();
  const [artist, setartist] = useState();
  const [image, setimage] = useState([]);
  const [previewimage, setpreviewimage] = useState();
  const [subcategory, setsubcategory] = useState();
  const getdata = (id) => {
    try {
      const response = axios({
        method: "get",
        url: `http://localhost:3002/products/${id}`,
      }).then((response) => {
        console.log(response);
        setname(response.data.name);
        setdescription(response.data.description);
        setsubcategory(response.data.subcategory);
        setimage(response.data.image);
        setprice(response.data.price);
        setartist(response.data.artist);
        setcount(response.data.count);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangefile = (event) => {
    const file = event.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:3002/upload",
        data: uploadFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const datarespose = response.data.filename;
        setimage(datarespose);
        // setpreviewimage(URL.createObjectURL(datarespose))
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(name);

  const handleSubmit = (event) => {
    const editdata = {
      image: image,
      name: name,
      artist: artist,
      price: price,
      count: count,
      description: description,
      subcategory: subcategory,
    };
    // console.log(loginFormData);
    try {
      const response = axios({
        method: "put",
        url: `http://localhost:3002/products/${id}`,
        data: editdata,
        headers: { "Content-Type": "application/json" },
      }).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };
  useEffect(() => {
    getdata(id);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChangefile} name={"image"} />
      <img src={`http://localhost:3002${image}`} width="30px" />
      <label style={{ display: "block" }} htmlFor={name}>
        {"نام:"}
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
        name={"name"}
      />

      <label style={{ display: "block" }} htmlFor={price}>
        {"قیمت :"}
      </label>

      <input
        type="text"
        value={price}
        onChange={(e) => setprice(e.target.value)}
        name={"price"}
      />
      <label style={{ display: "block" }}>{"هنرمند :"}</label>

      <input
        type="text"
        value={artist}
        onChange={(e) => setartist(e.target.value)}
        name={"artist"}
      />
      <label style={{ display: "block" }}>{" تعداد :"}</label>

      <input
        type="text"
        value={count}
        onChange={(e) => setcount(e.target.value)}
        name={"count"}
      />
      <label style={{ display: "block" }}>{"دسته بندی :"}</label>

      <select
        value={subcategory}
        onChange={(e) => setsubcategory(e.target.value)}
        name={"subcategory"}
      >
        <option value="0">ابستره</option>
        <option value="1">گرافیک ارت</option>
        <option value="2">ایلاستریتور</option>
        <option value="3">سیاه و سفید</option>
      </select>
      <label style={{ display: "block" }}>{"توضیحات :"}</label>

      <textarea
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        name={"description"}
      />
      <br></br>
      <input type="submit" value="ویرایش" />
    </form>
  );
}
