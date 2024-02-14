import express from 'express';
import Product from '../model/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const app = express();

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get(
  '/search  ',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const searchQuery = query.query || '';

    if (!searchQuery) {
      return res.status(400).send({ message: 'Please provide a search query.' });
    }

    const queryFilter = {
      name: {
        $regex: searchQuery,
        $options: 'i',
      },
    };

    const products = await Product.find(queryFilter);

    const countProducts = await Product.countDocuments(queryFilter);
    res.send({
      products,
      countProducts,
    });
  })
);




export default productRouter