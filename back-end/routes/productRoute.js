import express from 'express';
import Product from '../model/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });  
const productRouter = express.Router(); 

productRouter.use('/uploads', express.static('uploads'));


// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});
             

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

productRouter.get(
  '/search',
  expressAsyncHandler (async (req, res) => {
    const { query } = req.query;
    const searchQuery = query || '';

    let queryFilter = {};

    if (searchQuery && searchQuery !== 'all') {
      queryFilter = {
        name: {
          $regex: searchQuery,
          $options: 'i',
        },
      };
    }

    try {
      const products = await Product.find({ ...queryFilter });
      const countProducts = await Product.countDocuments({ ...queryFilter });

      res.send({
        products,
        countProducts,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);

// Admin products
productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
  
    const products = await Product.find()
    
    res.send(products);
  })
);

//review
productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product deleted successfully", product });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}));



export default productRouter