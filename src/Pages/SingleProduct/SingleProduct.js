import React, { useEffect, useState } from "react";
import Productpagelyout from "../../Lyouts/ProductPage/Productpagelyout";
import BasicBreadcrumbs from "./Breadcrumb";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { api } from "../../Utils/axios";
import FechRows from "../Home/FechRows";
import { CircularProgress } from "@mui/material";
import { Box, margin } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCart } from "../../redux/actions/cardactions";
import { connect } from "react-redux";
import { GetAllProduct } from "../../redux/actions/cardactions";
import { useDispatch } from "react-redux";
import {IncreaseQuantity,DecreaseQuantity,DeleteCart} from '../../redux/actions/cardactions';

function SingleProduct(props) {
  let params = useParams();
  const [data, setData] = useState([]);
  // const [carditems, setcarditems] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const subcategory = useSelector((state) => state.subcategorydata.value);
  const categories = useSelector((state) => state.categories.value);
  const [open, setOpen] = React.useState(false);
  const [value, setvalue] = useState(1);
  // console.log(carditems[0]);
  async function getproductdata(input) {
    try {
      const response = await api.get(`/products`).then((res) => {
        dispatch(GetAllProduct(res.data));
        const productdata = res.data.filter((value) => value.name == input);
        setData(productdata);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  function findsub(input) {
    const found = subcategory.find((res) => res.id == input);
    return found.name;
  }

  function minesbutt() {
    
    if (value > 1) {
      setvalue(value - 1);

    }
  }

  function addbutt() {
    if (value <= data[0].count) {
      setvalue(value + 1);
      props.increasequantity(data[0].id)
    }
  }
  function addtocard() {
    props.AddCart({
      id: `${data[0].id}`,
      name: `${data[0].name}`,
      image: `${data[0].image}`,
      thumbnail: `${data[0].image}`,
      price: `${data[0].price}`,
      quantity: value,
    });
    setOpen(true);
  }
  console.log(data);
  useEffect(() => {
    getproductdata(params.productId);
    return ()=>{
    // setvalue(1)

    }
  }, [params.productId, value]);
  // console.log(data[0]);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7}>
            <img
              src={`http://localhost:3002${data[0].image}`}
              style={{ borderRadius: "2px", margin: "1rem" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <h1>{data[0].name}</h1>
            <BasicBreadcrumbs
              category={categories[1]}
              subcategory={findsub(data[0].subcategory)}
              subcategoryId={data[0].subcategory}
              name={data[0].name}
            />
            <h2>تومان{data[0].price}</h2>

            {data[0].count == 0 ? (
              <h5>اتمام موجودی</h5>
            ) : (
              <Box>
                <button variant="contained" sx={{ borderRadius: "50%" }}>
                  <RemoveIcon onClick={() => minesbutt()} />
                </button>
                <TextField
                  type="text"
                  value={value}
                  size="small"
                  sx={{ maxWidth: "3rem", maxHeight: "3rem" }}
                />
                <button variant="contained">
                  <AddIcon onClick={() => addbutt()} />
                </button>
              </Box>
            )}
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4caf50", margin: "1rem" }}
              onClick={addtocard}
            >
              افزودن به سبد خرید
            </Button>
          </Grid>
        </Grid>
      </Box>

      <div className="downarea">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: data[0].description }} />
        </Box>
      </div>
      <div>
        <h3>محصولات مشابه</h3>
        <FechRows item={data[0].subcategory} />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="محصول با موفقیت به سبد افزوده شد"
        action={action}
      />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    _products: state._todoProduct,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    AddCart: (item) => dispatch(AddCart(item)),
    increasequantity:(item)=>dispatch(IncreaseQuantity(item))
  };
}
export default Productpagelyout(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
