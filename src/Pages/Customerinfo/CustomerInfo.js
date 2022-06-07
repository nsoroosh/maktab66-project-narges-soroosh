import Productpagelyout from '../../Lyouts/ProductPage/Productpagelyout' 
import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { edititem } from '../../redux/reducers/Edititem';
import { useNavigate } from 'react-router-dom';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect } from 'react';

const validationSchema = yup.object({
  firstname: yup
    .string('نام خود را وارد کنید')
    .required('وارد کردن این مورد الزامی است'),
  lastname: yup
    .string('نام خانوادگی خود را وارد کنید')
    .required('وارد کردن این مورد الزامی است'),
    phone: yup
    .number('شماره تلن خود را وارد کنید')
    .required('وارد کردن این مورد الزامی است'),
    address: yup
    .string('ادرس خود را وارد کنید')
    .required('وارد کردن این مورد الزامی است'),
});

const CustomerInfo = () => {
  
  const [value, setValue] = React.useState(new Date());
  console.log(value);
  useEffect(() => {
  
localStorage.setItem("deliveryDate",value)
  
  }, [value])
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      phone:'',
      address:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("customerinfo",JSON.stringify(values))
  window.open("http://localhost:3000/fake-shaparak/","_self")
    },
  });


  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{padding:"3rem"}}>
        <TextField
        sx={{width:"40%",margin:"1rem"}}
       dir="ltr"

          id="firstname"
          name="firstname"
          label="نام"
          type="text"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
        />
        <TextField
        sx={{width:"40%",margin:"1rem"}}
        dir="ltr"

          id="lastname"
          name="lastname"
          label="نام خانوادگی"
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        <TextField
        sx={{width:"40%",margin:"1rem"}}
        dir="ltr"

          id="phone"
          name="phone"
          label="شماره همراه"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
       sx={{width:"40%",margin:"1rem"}}
       dir="ltr"

          id="address"
          name="address"
          label="ادرس"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
          // label='تاریخ تحویل'

        mask="____/__/__"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        <Button color="primary" variant="contained"  type="submit"  >
        پرداخت
        </Button>
      </form>
    </div>
  );
};




export default Productpagelyout(CustomerInfo)