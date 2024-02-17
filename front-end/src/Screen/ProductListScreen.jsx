import React, { useContext, useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MeassageBox'; 
import { Store } from '../Store'; 
import axios from 'axios';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
 
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: []
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/products`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` }
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);
  
  return (
    <div className="container-fluid">
      <Helmet>
        <title>Products List</title>
      </Helmet>
      <h1>Products List</h1>
     
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Brand</th>
                <th>Price</th>
                <th>category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => ( 
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.slug}</td>
                  <td>{product.brand}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      Go To
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
