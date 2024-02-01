import express from "express";
import cors from "cors"; // Import the cors middleware
import data from "./data.js";

const app = express();

// Use cors middleware
app.use(cors());

app.get('/products', (req, res) => {
  res.json(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
