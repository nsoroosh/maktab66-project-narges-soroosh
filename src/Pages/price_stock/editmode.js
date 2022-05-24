import React from "react";
import { useState , useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import { useDispatch  , useSelector} from "react-redux";
import stockedititem from "../../redux/reducers/stockeditItem";
import { addnewstockvalue } from "../../redux/reducers/newstockValue";
import axios from "axios";
export default function Editmode(props) {
  const [stockeditmode, setstockeditmode] = useState(false);
  const dispatch = useDispatch();
  const [inputvalue, setinputvalue] = useState()
  const [product, setproduct] = useState()
  const newstockvalue = useSelector((state) => state.newstockvalue.value);
  
  const getdata =(id)=>{
    try {
      const response = axios({
        method: "get",
        url: `http://localhost:3002/products/${id}`,
        
      }).then((response) =>{
        console.log(response);
        setproduct(response.data)
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    
  
    return () => {
      dispatch(addnewstockvalue(inputvalue))
    }
  }, [inputvalue])
  
  return (
    <div>
      {stockeditmode ? (
        
          <input type={"text"} onChange={(e)=>setinputvalue(e.target.value)} value={product.count}/>
          
        
      ) : (
        <TableCell
          align="right"
          onClick={() => {
            getdata(props.id)
            setstockeditmode(true);
            dispatch(stockedititem(props.id));
            // dispatch(newstockvalue(props.stock))

          }
        }
        >
          {props.stock}
        </TableCell>
      )}
    </div>
  );
}
