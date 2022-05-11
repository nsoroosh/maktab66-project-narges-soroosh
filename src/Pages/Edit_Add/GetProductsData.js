import axios from 'axios'
import { loaded } from '../../redux/reducers/LoadProductdata';
import { getdata } from '../../redux/reducers/serverData';
import { useDispatch } from 'react-redux';
export default GetProductData

 function GetProductData(page,items) {
  const dispatch = useDispatch()

    try {
      const response =  axios.get(`http://localhost:3002/products?_page=${page}&_limit=${items}`);
      console.log(response.data)
      dispatch( getdata( response))
      dispatch( loaded(false))
    } catch (error) {
      console.error(error);
    }
}