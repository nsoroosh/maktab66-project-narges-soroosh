import { Routes, Route } from "react-router-dom";

import { render } from "react-dom";
import Admin from "../Pages/Admin";
import Card from "../Pages/Card";
import CustomerInfo from "../Pages/Customerinfo/CustomerInfo";
import Edit_Add from "../Pages/Edit_Add";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ManageOrders from "../Pages/ManagOrders/ManageOrders";
import Noresponse from "../Pages/Noresponse/Noresponse";
import Payment from "../Pages/Payment/Payment";
import Price_Stock from "../Pages/Price_Stock";
import Products from "../Pages/Products/Products";
import ResultPament from "../Pages/ResultPayment/ResultPament";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="card" element={<Card />} />
        <Route path="customerinfo" element={<CustomerInfo />} />
        <Route path="Payment" element={<Payment />}>
          <Route path=":Resultpayment" element={<ResultPament />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route index element={<Edit_Add />} />
        <Route path="price_stock page" element={<Price_Stock />} />
        <Route path="mange orders" element={<ManageOrders />} />
        <Route path="products" element={<Products />}>
          <Route path=":productid" element={<SingleProduct />} />
        </Route>
        <Route path=":productid" element={<SingleProduct />} />

        <Route path="login" element={<Login />} />
        <Route path="*" element={<Noresponse />} />
      </Routes>
    </div>
  );
}

export default App;


