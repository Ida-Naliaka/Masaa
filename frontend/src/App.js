import './App.css';
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { Routes, Route, Navigate } from "react-router-dom";
import Success from "./Pages/Success";
import Signup from "./Pages/Signup";
import AllProducts from "./Pages/AllProducts";
import LandingPage from "./Pages/LandingPage";
import WelcomePage from "./Pages/WelcomePage";
import Reset from "./Pages/ResetPassword";
import AddProduct from "./Admin/Components/AddProduct";
import Myorders from "./Admin/Components/Myorders";
import DisplayProducts from "./Admin/Components/DisplayProducts";
import Gallery from "./Pages/Gallery";
import { useSelector } from 'react-redux';
import Userorders from './Pages/Userorders';

function App() {
    const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/shop" element={<Home />} />
        <Route exact path="/ourwork" element={<Gallery />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route exact path="/statusupdate" element={user ? <Userorders />: <Navigate to="/login" />}/>
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/products/product/:id" element={<Product />} />
        <Route exact path="/admin/product/add" element={<AddProduct/>} />
        <Route exact path="/admin/product/display" element={<DisplayProducts />} />
        <Route exact path="/admin/orders" element={<Myorders />} />
        <Route
          exact
          path="cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route exact path="/success/:payment_txn_id" element={<Success />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/auth/:confirmationCode" element={<WelcomePage />} exact />
        <Route path="/auth/reset/:id" element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
