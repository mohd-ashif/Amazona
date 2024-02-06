import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import NavDropdown from "react-bootstrap/NavDropdown"
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import cart_icon from "../public/images/cart_icon.png"
import CartScreen from './Screen/CartScreen';
import SigninScreen from './Screen/SigninScreen';
import ShippingScreen from './Screen/ShippingScreen';
import SignupScreen from './Screen/SignupScreen';
import PaymentMethodScreen from './Screen/PaymentMethodScreen';
import PlaceOrderScreen  from './Screen/PlaceOrderScreen';
import Order from '../../back-end/model/orderModel';
import OrderScreen from './Screen/OrderSreen';
import OrderHistoryScreen from './Screen/OrderHistoryScreen';


function App() {
  const { state , dispatch:ctxDipatch} = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = ()=> {
    ctxDipatch({  type :"USER_SIGNOUT" })
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }

  return (
    <>
      <BrowserRouter>
        <div className='d-flex flex-column site-container'>
        <ToastContainer position="bottom-center" limit={1} />
          <header>
            <Navbar bg='dark' variant='dark'>
              <Container>
                <LinkContainer to='/'>
                  <Navbar.Brand>amazona</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto bg-dark text-white">

                  <Link to="/cart" className='nav-link' >
                  <img src={cart_icon} alt="Cart" style={{ width: '35px', height: '35px' }} />
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                         {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                </Nav>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className='mt-3'>
              <Routes>
                <Route path='/product/:slug' element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignupScreen/>} />
                <Route path="/placeorder" element={<PlaceOrderScreen/>} />
                
                <Route path="/order/:id"  element={<OrderScreen />}></Route>
                <Route path="/orderhistory"  element={<OrderHistoryScreen />}></Route>
                <Route path="/shipping"  element={<ShippingScreen />}></Route>
                <Route path="/payment"  element={<PaymentMethodScreen />}></Route>
                <Route path="/" element={<HomeScreen />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className='text-center'>all rights reserved</div>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
