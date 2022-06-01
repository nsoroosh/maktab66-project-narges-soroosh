import { Button, Typography } from '@mui/material'
import axios from 'axios'
import React , {useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Productpagelyout from '../../Lyouts/ProductPage/Productpagelyout' 


 function Payment() {
   const [data, setdata] = useState()
   const [productdata, setproductdata] = useState( )
   const navigate = useNavigate()
   const customerdata = ( useSelector(state=>state.edititem.value))
   const carditems = JSON.parse( localStorage.getItem("carditems"))
   function sendCustomerData(){
      axios.post('http://localhost:3002/orders',(data)).then(
        res=>{console.log(res)
          change()
console.log(productdata);
          // localStorage.removeItem("carditems")
        // navigate('/payment/sucsess')
      }
      )
      .catch(res=>{
        console.log(res)
        navigate('/payment/failed')
      }
        )
   }
   function getproductdata() {
    axios
      .get(`http://localhost:3002/products`)
      .then((res) => {
        // console.log(res.data);
        setproductdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function change(){
    carditems.forEach(element => {
      editstock(element.id,element.count)
    })
    // axios
    // .post(`http://localhost:3002/products`.data)
    // .then((res) => {
      //   console.log(res);
      
      // })
      // .catch((err) => {
        //   console.log(err);
        // });
      }
      console.log(productdata);
   
   function editstock(id,count){

     productdata.map(res=>{
       if(res.id==id){
         res.count = Number(res.count)-count
       }
     }
     )
   }
   function timestamp(){
    const moonLanding = new Date(`${customerdata.date}`);
    const timestamp = (moonLanding.getTime());
    return Math.floor(timestamp/1000)
   }
   console.log(data);

   useEffect(() => {
     getproductdata()
     const delivery = timestamp()
      setdata({
      "customerDetail": customerdata,
      "orderNumber": `${parseInt(Math.random() * (10000 - 1000) + 1000)}`,
      "orderDate": `${Math.floor(Date.now()/1000)}`,
      "purchaseTotal": `${carditems.purchaseTotal}`,
      "orderStatus": "2",
      "delivery":`${delivery}`,
      "deliveredAt": "",
      "orderItems": carditems,
     })
   
     
   }, [])
   
  return (
    <>
    <Typography variant='h5' component='h3'>
      میخواهید پرداخت کنید ؟
    </Typography>
    <Button variant="contained"  onClick={sendCustomerData}>
      بله
    </Button>
    <Button variant="contained" onClick={()=>navigate('/payment/failed')} >
     خیر
    </Button>
    </>
  )
}
export default Productpagelyout(Payment)