import React, { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [description, setdescription] = useState()
  const [name, setname] = useState()
  const [image, setimage] = useState([])
  const [price, setprice] = useState()
  const [count, setcount] = useState()
  const [artist, setartist] = useState()
  const [subcategory, setsubcategory] = useState()
const  handleChangefile=(event)=> {
    const file = event.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:3002/upload",
        data: uploadFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) =>{
        const datarespose =  response.data.filename
        setimage(datarespose)
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(name);

 
const  handleSubmit=(event)=> {
    const loginFormData = new FormData();
    loginFormData.append("image",`/files/${image}`);
    loginFormData.append("thumbnail",`/files/${image}`)
    loginFormData.append("name",name);
    loginFormData.append("artist",artist)
    loginFormData.append("price",price)
    loginFormData.append("count",count)
    loginFormData.append("description",description);
    loginFormData.append("subcategory", subcategory);
    console.log(loginFormData);
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:3002/products",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
    <input type="file" onChange={handleChangefile} name={"image"} />
    <label style={{display:"block"}}>
      {"نام:"}
      <input
        type="text"
        value={name}
        onChange={(e)=>setname(e.target.value)}
        name={"name"}
      />
    </label>
    <label style={{display:"block"}}>
      {"قیمت :"}
      <input
        type="text"
        value={price}
        onChange={(e)=>setprice(e.target.value)}
        name={"price"}
      />
    </label>
    <label style={{display:"block"}}>
      {"هنرمند :"}
      <input
        type="text"
        value={artist}
        onChange={(e)=>setartist(e.target.value)}
        name={"artist"}
      />
    </label>
    <label style={{display:"block"}}>
      {" تعداد :"}
      <input
        type="text"
        value={count}
        onChange={(e)=>setcount(e.target.value)}
        name={"count"}
      />
    </label>
    <label style={{display:"block"}}>
      {"دسته بندی :"}
      <select
        value={subcategory}
        onChange={(e)=>setsubcategory(e.target.value)}
        name={"subcategory"}
      >
        <option value="0">ابستره</option>
        <option value="1">گرافیک ارت</option>
        <option value="2">ایلاستریتور</option>
        <option value="3">سیاه و سفید</option>
      </select>
    </label>
    <label style={{display:"block"}}>
      {"توضیحات :"}
      <textarea
        value={description}
        onChange={(e)=>setdescription(e.target.value)}
        name={"description"}
      />
    </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

