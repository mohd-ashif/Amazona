import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <>
      <BrowserRouter>
        <div className='d-flex flex-column site-container'>
          <ToastContainer position='bottom-center' limit={1} />
          <header>
            <Navbar bg='dark' variant='dark' expand='lg'>
              <Container>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='me-auto w-100 justify-content-end'>
                    <LinkContainer to='/'>
                      <Navbar.Brand>amazona</Navbar.Brand>
                    </LinkContainer>
                    <Nav className='me-auto w-100 justify-content-end'>
                      <Link to='/cart' className='nav-link'>
                        Cart{' '}
                        {cart.cartItems.length > 0 && (
                          <Badge pill bg='danger'>
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </Badge>
                        )}
                      </Link>
                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/orderhistory'>
                            <NavDropdown.Item>Order History</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <Link
                            className='dropdown-item'
                            to='#signout'
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </NavDropdown>
                      ) : (
                        <Link className='nav-link' to='/signin'>
                          Sign In
                        </Link>
                      )}
                      {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='admin-nav-dropdown'>
                          <LinkContainer to='/admin/dashboard'>
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/products'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orders'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/users'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                      )}
                    </Nav>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className='mt-3'>
              <Routes>
                <Route path='/product/:slug' element={<ProductScreen />} />
                {/* Add other routes here */}
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

