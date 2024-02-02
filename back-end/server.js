import express from "express";
import cors from "cors"; // Import the cors middleware
import data from "./data.js";

const app = express();

// Use cors middleware
app.use(cors());


//all products
app.get('/products', (req, res) => {
  res.json(data.products);
});

// particular product
app.get('/products/slug/:slug', (req, res) => {
    const product = data.products.find((x) => x.slug === req.params.slug)
   if(product){
    res.send(product);
   }else{
    res.status(404).send({message:'Product Not Found'})
   }
  });

  app.get('/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id)
   if(product){
    res.send(product);
   }else{
    res.status(404).send({message:'Product Not Found'})
   }
  });


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
