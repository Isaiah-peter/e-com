import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Dashbroad from "./pages/seller-pages/dashboard";
import MainDashBroad from "./pages/seller-pages/main-dashbroad";
import Order from "./pages/seller-pages/Order";
import ListSellerProduct from "./pages/seller-pages/product/ProductList";
import CreateProduct from "./pages/seller-pages/product/CreateProduct";
import SellerCategories from './pages/seller-pages/product/Category';
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const seller = user.user.is_seller
  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <Home user={seller} login={user} />
        </Route>

        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/cart">
          <Cart />
        </Route>

        <MainDashBroad>
          <Route
            path="/dashboard"
              render={({ match: { url } }) => {
                console.log(url)
                return (
                  <>
                    <Route path={`${url}/`} component={Dashbroad} exact />
                    <Route path={`${url}/orders`} component={Order} />
                    <Route path={`${url}/products`} component={ListSellerProduct} />
                    <Route path={`${url}/createproduct`} component={CreateProduct} />
                    <Route path={`${url}/categories`} component={SellerCategories} />
                  </>
                )
              }
            }
          />
        </MainDashBroad>
      </Switch>
    </Router>
  );
}

export default App;