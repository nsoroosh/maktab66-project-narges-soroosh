
import React, { useState } from "react";
import {api} from "../../Utils/axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MenuItem , Select , InputLabel  ,FormControl } from "@mui/material";

import changeitem from "../../redux/reducers/changeitem";



const validationSchema = yup.object({
  name: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  
});

export default function UploadForm() {
  const [image, setimage] = useState([]);
  const [imgData, setImgData] = useState(null);
  const dispatch = useDispatch()
  const [data, setdata] = useState({
    "image": "",
    "name":'',
    "artist": '',
    "price": '',
    "count": '',
    "description": '',
    "subcategory": '',
  })


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
        setdata({
          "image":`/files/${datarespose}`
        })
        // setpreviewimage(URL.createObjectURL(datarespose))
      });
    } catch (error) {
      console.log(error);
    }
  };


  
// console.log(data);
  const formik = useFormik({
    initialValues: {
      image: data.image,
      name:data.name,
      artist: data.artist,
      price: data.price,
      count: data.count,
      description: data.description,
      subcategory: data.subcategory,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify({...values,"image":`/files/${image}`}));
      try {
         api({
          method: "post",
          url: "/products",
          data: (JSON.stringify({...values,"image":`/files/${image}`})),
          headers: { "Content-Type": 'application/json'},
        }).then(res=>{
          console.log(res);
          dispatch(changeitem(data.name))

        })
      } catch (error) {
        console.log(error);
      }
    },
  });
  

return (
 <div>
  <form onSubmit={formik.handleSubmit}>
    <input type="file" onChange={handleChangefile} name={"image"} />
    <img src={imgData} width="60px" />
    
    <TextField
        fullWidth
        dir="ltr"
          sx={{ margin: "1rem 0" }}
        name="name"
        id="name"
        label="نام"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        dir="ltr"
          sx={{ margin: "1rem 0" }}
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
        fullWidth
        dir="ltr"
          sx={{ margin: "1rem 0" }}
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
        <MenuItem value={1}>ابستره</MenuItem>
        <MenuItem value={2}>گرافیک ارت</MenuItem>
        <MenuItem value={3}>ایلاستریتور</MenuItem>
        <MenuItem value={4}>سیاه و سفید</MenuItem>
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
  افزودن     
      </Button>
  </form>
  </div>
);
}



// const validationSchema = yup.object({
//   email: yup
//     .string('Enter your email')
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string('Enter your password')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });

// export default function UploadForm ()  {
//   const formik = useFormik({
//     initialValues: {
//       email: 'foobar@example.com',
//       password: 'foobar',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <Button color="primary" variant="contained" fullWidth type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

        // {...formik.getFieldProps('name')}
