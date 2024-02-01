import React, { useState } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Container  from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
       
        <div className='d-flex flex-column site-container' >
          <header  >
            <Navbar bg='dark' variant='dark'>
              <Container>
                
                  <LinkContainer to='/'>
                  <Navbar.Brand> amazona</Navbar.Brand>
                  </LinkContainer>
              
              </Container>
            </Navbar>

           
          </header>
          <main>
            <Container>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
        </Container>
          </main>
          <footer>
           <div className='text-center' > all rights reserved</div>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
