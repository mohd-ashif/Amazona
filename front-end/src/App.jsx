import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import cart_icon from "../public/images/cart_icon.png"


function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <BrowserRouter>
        <div className='d-flex flex-column site-container'>
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
                        {cart.cartItems.length}
                      </Badge>
                    )}
                  </Link>
                </Nav>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className='mt-3'>
              <Routes>
                <Route path='/product/:slug' element={<ProductScreen />} />
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
