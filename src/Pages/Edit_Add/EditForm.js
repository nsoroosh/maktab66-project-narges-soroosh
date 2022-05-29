import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MenuItem , Select , InputLabel  ,FormControl } from "@mui/material";




const validationSchema = yup.object({
  name: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function UploadForm() {
  const [image, setimage] = useState([]);
  const [imgData, setImgData] = useState(null);
  const [data, setdata] = useState({
    "image": image,
    "name":'',
    "artist": '',
    "price": '',
    "count": '',
    "description": '',
    "subcategory": '',
  })
  const id = useSelector((state) => state.edititem.value);


  const handleChangefile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
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


  const getdata = (id) => {
    try {
      const response = axios({
        method: "get",
        url: `http://localhost:3002/products/${id}`,
      }).then((response) => {
        console.log(response.data);
       setdata({
        "name":response.data.name,
        "artist": response.data.artist,
        "price": response.data.price,
        "count": response.data.count,
        "description": response.data.description,
        "subcategory": response.data.subcategory,
      })
      });
    } catch (error) {
      console.log(error);
    }
  };
console.log(image);
  const formik = useFormik({
    initialValues: {
      image: image,
      name:data.name,
      artist: data.artist,
      price: data.price,
      count: data.count,
      description: data.description,
      subcategory: data.subcategory,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        const response = axios({
          method: "put",
          url: `http://localhost:3002/products/${id}`,
          data: values,
          headers: { "Content-Type": "application/json" },
        }).then((res) => console.log(res));
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    getdata(id);
  }, []);

return (
 <div>
  <form onSubmit={formik.handleSubmit}>
    <input type="file" onChange={handleChangefile} name={"image"} />
    <img src={imgData} width="60px" />
    <TextField
        fullWidth
        id="name"
        name="name"
        label="نام"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="price"
        name="price"
        label="قیمت"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="artist"
        name="artist"
        label="هنرمند"
        value={formik.values.artist}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        label="تعداد"
        fullWidth
        id="count"
        name="count"
        value={formik.values.count}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
      <Select
       fullWidth
       id="subcategory"
       name="subcategory"
       value={formik.values.subcategory}
       onChange={formik.handleChange}
       error={formik.touched.email && Boolean(formik.errors.email)}
       helperText={formik.touched.email && formik.errors.email}
        label="دسته بندی"
      >
        <MenuItem value={1}>ابستره</MenuItem>
        <MenuItem value={2}>گرافیک ارت</MenuItem>
        <MenuItem value={3}>ایلاستریتور</MenuItem>
        <MenuItem value={4}>سیاه و سفید</MenuItem>
      </Select>
    </FormControl>
    <TextField
        label="توضیحات"
        fullWidth
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
    <Button color="primary" variant="contained" fullWidth type="submit">
        ویرایش
      </Button>
  </form>
  </div>
);
}