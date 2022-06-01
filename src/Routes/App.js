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
import PrivateRoute from "./Private/privateRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="card" element={<Card />} />
        <Route path="customerinfo" element={<CustomerInfo />} />
        <Route path="payment" element={<Payment />} />
        <Route path="payment/:Resultpayment" element={<ResultPament />} />
        <Route path="products/:productcatagory" element={<Products />} />
        <Route path="product/:productId" element={<SingleProduct />} />
        <Route path="login" element={
        <PrivateRoute>
        <Login />
        </PrivateRoute>
        } />
        <Route path="admin" element={
        <ProtectedRoute>
        <Edit_Add />
        </ProtectedRoute>
        } />
        <Route path="price_stock" element={
        <ProtectedRoute>
        <Price_Stock />
        </ProtectedRoute>
        } />
        <Route path="orders" element={
        <ProtectedRoute>
        <ManageOrders />
        </ProtectedRoute>
        } />
        
        <Route path="*" element={<Noresponse />} />
      </Routes>
    </div>
  );
}

export default App;
