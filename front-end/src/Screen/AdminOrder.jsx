import React, { useContext, useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MeassageBox'; 
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Admin() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const {id} = useParams()

  const navigate = useNavigate();
 
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orders: []
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/orders/mine`,
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

  const acceptOrder = async (orderId) => {
    try {
        const response = await axios.put(`http://localhost:5000/orders/${orderId}/accept`   );
        if (response.status === 200) {
            toast('Order accepted successfully.');
            // Refresh orders list after accepting the order
            fetchData();
        } else {
            toast('Failed to accept order.');
        }
    } catch (error) {
        toast('Failed to accept order.');
    }
};


  return (
    <div className="container-fluid">
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
     
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {order.isPaid ?( // Render button only if order is paid
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => acceptOrder(order._id)}
                      >
                        Delivery  
                      </button>
                    ) :   <button
                    type="button"
                    className="btn btn-danger"
                  
                  >
                   pending
                  </button>}
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
