import React, { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../component/Product';
import MessageBox from '../component/MeassageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
        error: '',
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }

};

export const SearchScreen = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || 'all';

  const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
    page: 1,
    pages: 1,
    countProducts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/products/search?query=${query}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [query]);

  return (
    <div>
      {products.length === 0 && (
        <MessageBox>No Product Found</MessageBox>
      )}
      <Row>
        {products.map((product) => (
          <Col sm={6} lg={4} className="mb-3" key={product._id}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchScreen;
