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

// import { DatePicker } from 'mr-jalali-react-datepicker';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const CustomerInfo = () => {
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const [value, setValue] = React.useState(new Date());
  
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      phone:'',
      address:"",
      date:`${value}`
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(edititem((values)))
   navigate('/payment')
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{padding:"3rem"}}>
        <TextField
        sx={{width:"50%"}}
       dir="ltr"

          id="firstname"
          name="firstname"
          label="نام"
          type="text"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
        sx={{width:"50%"}}
        dir="ltr"

          id="lastname"
          name="lastname"
          label="نام خانوادگی"
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
        sx={{width:"50%"}}
        dir="ltr"

          id="phone"
          name="phone"
          label="شماره همراه"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
        sx={{width:"50%"}}
        dir="ltr"

          id="address"
          name="address"
          label="ادرس"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
          label='تاریخ تحویل'

        mask="____/__/__"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        <Button color="primary" variant="contained"  type="submit" >
        پرداخت
        </Button>
      </form>
    </div>
  );
};




export default Productpagelyout(CustomerInfo)