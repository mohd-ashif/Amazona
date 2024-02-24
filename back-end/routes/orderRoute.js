import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import { isAuth , isAdmin} from '../utils.js';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({ }); 
      res.send(orders);
    } catch (error) {
      
      console.error('Error fetching orders:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  })
);


orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  
  
  orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
  
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRouter.get('/', isAdmin, expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({});
      res.send(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }));
  
  orderRouter.put('/:id/accept', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      order.isDelivered = true;
      order.deliveredAt = Date.now(); 
      const updatedOrder = await order.save();
  
      res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      console.error('Error accepting order:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  }));
  
  orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Order.findByIdAndDelete(id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order deleted successfully", order });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  }));
  
  

export default orderRouter;