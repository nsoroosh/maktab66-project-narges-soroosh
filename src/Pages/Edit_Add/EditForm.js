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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
    .string("نام محصول را وارد کنید")
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

export default function UploadForm(props) {
  const [image, setimage] = useState([]);
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch();
  const [productdata, setproductdata] = useState({
    image: "",
    name: "",
    artist: "",
    price: "",
    count: "",
    description: "",
    subcategory: "",
  });
  const id = useSelector((state) => state.edititem.value);
  const subcategory = useSelector((state) => state.subcategorydata.value);

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
        formik.setFieldValue("image",`/files/${datarespose}`)
        formik.setFieldValue("thumbnail",`/files/${datarespose}`)
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
        setproductdata({
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
  console.log(productdata);
  const formik = useFormik({
    initialValues: {
      image: productdata.image,
      name: productdata.name,
      artist: productdata.artist,
      price: productdata.price,
      count: productdata.count,
      description: productdata.description,
      subcategory: productdata.subcategory,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      try {
        const response = api({
          method: "put",
          url: `/products/${id}`,
          data: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res);
          props.handleClose()
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
          onChange={formik.handleChange }
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
          onChange={formik.handleChange }
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
          onChange={formik.handleChange  }
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
          onChange={formik.handleChange }
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
            onChange={formik.handleChange }
            error={formik.touched.subcategory && Boolean(formik.errors.subcategory)}
            helperText={formik.touched.subcategory && formik.errors.subcategory}
            label="دسته بندی"
          >
            
            <MenuItem value={subcategory[1].id}>{subcategory[1].name}</MenuItem>
            <MenuItem value={subcategory[2].id}>{subcategory[2].name}</MenuItem>
            <MenuItem value={subcategory[3].id}>{subcategory[3].name}</MenuItem>
            <MenuItem value={subcategory[0].id}>{subcategory[0].name}</MenuItem>
           
          </Select>
        </FormControl>
        <CKEditor
          editor={ClassicEditor}
          data={formik.values.description}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            formik.setFieldValue("description",editor.getData())
            console.log({ event, editor });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          ویرایش
        </Button>
      </form>
    </div>
  );
}
