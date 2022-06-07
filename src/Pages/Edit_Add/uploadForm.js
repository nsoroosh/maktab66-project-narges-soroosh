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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const validationSchema = yup.object({
  name: yup
    .string("نام محصول را وارد کنید")
    .required("وارد کردن این مورد الزامی است"),
  artist: yup
    .string("نام محصول را وارد کنید")
    .required("وارد کردن این مورد الزامی است"),
  description: yup
    .string("نام محصول را وارد کنید")
    .required("وارد کردن این مورد الزامی است"),
  subcategory: yup
  .string("توضیحات  محصول را وارد کنید")
  .required("وارد کردن این مورد الزامی است"),
  price: yup
    .number("مبلغ مورد نظر را وارد کنید")
    .required("وارد کردن این مورد الزامی است")
    .positive("مقدار وارد شده صحیح نمی باشد")
    .integer("مقدار وارد شده صحیح نمی باشد"),
  count: yup
    .number("مبلغ مورد نظر را وارد کنید")
    .required("وارد کردن این مورد الزامی است")
    .positive("مقدار وارد شده صحیح نمی باشد")
    .integer("مقدار وارد شده صحیح نمی باشد"),
});

export default function UploadForm() {
  const [image, setimage] = useState([]);
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();
  const [productdata, setproductdata] = useState({
    image: "",
   
    description: "",
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
        setproductdata({ ...productdata, image: `/files/${datarespose}` });
        // setpreviewimage(URL.createObjectURL(datarespose))
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(productdata);
  const formik = useFormik({
    initialValues: {
      // image: productdata.image,
      // thumbnail:productdata.image,
      name: "",
      artist: "",
      price: "",
      count:"",
      // description: productdata.description,
      subcategory: "",
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values))
      alert( JSON.stringify({...values,image: productdata.image,thumbnail:productdata.image,description: productdata.description}))
      // try {
      //   const response = api({
      //     method: "put",
      //     url: `/products/${id}`,
      //     data: JSON.stringify({...values,image: productdata.image,thumbnail:productdata.image,description: productdata.description}),
      //     headers: { "Content-Type": "application/json" },
      //   }).then((res) => {
      //     console.log(res);
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
    },
  });
 
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
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
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
          error={formik.touched.artist && Boolean(formik.errors.artist)}
          helperText={formik.touched.artist && formik.errors.artist}
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
          error={formik.touched.count && Boolean(formik.errors.count)}
          helperText={formik.touched.count && formik.errors.count}
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
            error={formik.touched.subcategory && Boolean(formik.errors.subcategory)}
            helperText={formik.touched.subcategory && formik.errors.subcategory}
            label="دسته بندی"
          >
            <MenuItem value={2}>ابستره</MenuItem>
            <MenuItem value={4}>گرافیک ارت</MenuItem>
            <MenuItem value={3}>ایلاستریتور</MenuItem>
            <MenuItem value={1}>سیاه و سفید</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          label="توضیحات"
          fullWidth
          dir="ltr"
          sx={{ margin: "1rem 0" }}
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        /> */}
          <CKEditor
                    editor={ ClassicEditor }
                    data={formik.values.description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setproductdata({...productdata,description:data})
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        <Button color="primary" variant="contained" fullWidth type="submit">
          ویرایش
        </Button>
      </form>
    </div>
  );
}
