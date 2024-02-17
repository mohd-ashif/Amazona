import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Add Product</h2>
              <p className="card-text">Add a new product to the store.</p>
              <Link to="/admin/create" className="btn btn-dark">Add Product</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">List Products</h2>
              <p className="card-text">View and manage existing products.</p>
              <Link to="/admin/products" className="btn btn-dark">List Products</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Orders</h2>
              <p className="card-text">View and manage orders.</p>
              <Link to="/admin/orders" className="btn btn-dark">View Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
