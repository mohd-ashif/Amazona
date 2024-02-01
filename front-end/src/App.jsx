import React, { useState } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
       
        <div>
          <header>
            <Link to="/">Amazona</Link>
          </header>
          <main>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>

          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
