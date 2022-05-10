import { Routes, Route } from "react-router-dom";

import { render } from "react-dom";
import Admin from "../Pages/Admin/Admin";
import Card from "../Pages/Card/Card";
import CustomerInfo from "../Pages/Customerinfo/CustomerInfo";
import Edit_Add from "../Pages/Edit_Add/Edit_Add";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ManageOrders from "../Pages/ManagOrders/ManageOrders";
import Noresponse from "../Pages/Noresponse/Noresponse";
import Payment from "../Pages/Payment/Payment";
import Price_Stock from "../Pages/price_stock/Price_Stock";
import Products from "../Pages/Products/Products";
import ResultPament from "../Pages/ResultPayment/ResultPament";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import ProtectedRoute from "./Protected/ProtectedRoute";
import PrivateRoutes from "./Private/privateRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="card" element={<Card />} />
        <Route path="customerinfo" element={<CustomerInfo />} />
        <Route path="Payment" element={<Payment />} />
        <Route path=":Resultpayment" element={<ResultPament />} />
        <Route path="admin" element={
        <ProtectedRoute>
        <Edit_Add />
        </ProtectedRoute>
        } />
        <Route path="price_stock page" element={
        <ProtectedRoute>
        <Price_Stock />
        </ProtectedRoute>
      } />
        <Route path="manage orders" element={
        <ProtectedRoute>
        <ManageOrders />
        </ProtectedRoute>
      } />
        <Route path="products" element={<Products />} />
        <Route path=":productid" element={<SingleProduct />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Noresponse />} />
      </Routes>
    </div>
  );
}

export default App;
