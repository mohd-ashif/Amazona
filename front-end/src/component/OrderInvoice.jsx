import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap'; // Assuming you're using Bootstrap for styling

const OrderInvoice = ({ orderId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const downloadInvoice = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/orders/invoice/${orderId}`, {
        responseType: 'blob', // Set the responseType to 'blob' to receive binary data
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
     console.log(orderId)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${orderId}.pdf`);

      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      setLoading(false);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please login to download the invoice.');
      } else {
        setError('Failed to download the invoice. Please try again later.');
      }
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={downloadInvoice} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Invoice'}
      </Button>
    </div>
  );
};

export default OrderInvoice;
