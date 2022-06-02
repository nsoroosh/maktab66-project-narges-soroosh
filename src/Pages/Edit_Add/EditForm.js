import React, { useState } from "react";
import { api } from "../../Utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import changeitem from "../../redux/reducers/changeitem";
const validationSchema = yup.object({
  // name: yup
  //   .string("نام محصول را وارد کنید")
  //   .required("وارد کردن این مورد الزامی است"),
  //   artist: yup
  //   .string("نام محصول را وارد کنید")
  //   .required("وارد کردن این مورد الزامی است"),
  //   description: yup
  //   .string("نام محصول را وارد کنید")
  //   .required("وارد کردن این مورد الزامی است"),
  //   subcategory: yup
  //   .required("وارد کردن این مورد الزامی است"),
  // price: yup
  //   .number("مبلغ مورد نظر را وارد کنید")
  //   .required("وارد کردن این مورد الزامی است")
  //   .positive("مقدار وارد شده صحیح نمی باشد")
  //   .integer("مقدار وارد شده صحیح نمی باشد"),
  //   count: yup
  //   .number("مبلغ مورد نظر را وارد کنید")
  //   .required("وارد کردن این مورد الزامی است")
  //   .positive("مقدار وارد شده صحیح نمی باشد")
  //   .integer("مقدار وارد شده صحیح نمی باشد"),
});

export default function UploadForm() {
  const [image, setimage] = useState([]);
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    image: "",
    name: "",
    artist: "",
    price: "",
    count: "",
    description: "",
    subcategory: "",
  });
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
      const response = api({
        method: "post",
        url: "/upload",
        data: uploadFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const datarespose = response.data.filename;
        setimage(datarespose);
        setdata({ ...data, image: `/files/${datarespose}` });
        // setpreviewimage(URL.createObjectURL(datarespose))
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = (id) => {
    try {
      const response = api({
        method: "get",
        url: `/products/${id}`,
      }).then((response) => {
        // setImgData(response.data.image)
        // console.log(response.data.image);
        setdata({
          image: response.data.image,
          name: response.data.name,
          artist: response.data.artist,
          price: response.data.price,
          count: response.data.count,
          description: response.data.description,
          subcategory: response.data.subcategory,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);
  const formik = useFormik({
    initialValues: {
      image: data.image,
      name: data.name,
      artist: data.artist,
      price: data.price,
      count: data.count,
      description: data.description,
      subcategory: data.subcategory,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert( JSON.stringify(values))
      try {
        const response = api({
          method: "put",
          url: `/products/${id}`,
          data: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res);
          // dispatch(changeitem(id))
        });
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
        <TextField type="file" onChange={handleChangefile} name={"image"} />
        <img src={imgData} width="60px" />
        <TextField
          dir="ltr"
          sx={{ margin: "1rem 0" }}
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
          dir="ltr"
          sx={{ margin: "1rem 0" }}
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
          dir="ltr"
          sx={{ margin: "1rem 0" }}
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
          dir="ltr"
          sx={{ margin: "1rem 0" }}
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
            dir="ltr"
            sx={{ margin: "1rem 0" }}
            id="subcategory"
            name="subcategory"
            value={formik.values.subcategory}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="دسته بندی"
          >
            <MenuItem value={2}>ابستره</MenuItem>
            <MenuItem value={4}>گرافیک ارت</MenuItem>
            <MenuItem value={3}>ایلاستریتور</MenuItem>
            <MenuItem value={1}>سیاه و سفید</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="توضیحات"
          fullWidth
          dir="ltr"
          sx={{ margin: "1rem 0" }}
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
