import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoute.js';
import productRouter from './routes/productRoute.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to db');
}).catch((err) => {
  console.log(err.message);
});

const app = express();

// Enable CORS globally
app.use(cors());

app.use('/seed', seedRouter);
app.use('/products', productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
