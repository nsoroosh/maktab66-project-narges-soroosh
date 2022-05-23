import React from "react";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import { useDispatch  , useSelector} from "react-redux";
import stockedititem from "../../redux/reducers/stockeditItem";
import { newstockvalue } from "../../redux/reducers/newstockValue";
export default function Editmode(props) {
  const [stockeditmode, setstockeditmode] = useState(false);
  const dispatch = useDispatch();
  const newstockvalue = useSelector((state) => state.newstockvalue.value);

  const getInputValue = (event)=>{
    // show the user input value to console
  dispatch(newstockvalue([event.target.value]))
  }
  return (
    <div>
      {stockeditmode ? (
        
          <input type={"text"} onChange={getInputValue()}/>
          
        
      ) : (
        <TableCell
          align="right"
          onClick={() => {
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
