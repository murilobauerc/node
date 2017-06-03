const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./product');
const app = express();
const cors = require('cors')
app.use(bodyParser.json());

const port = process.env.PORT || 8000;
mongoose.connect('mongodb://ulbra_curso_node:ulbra_curso_node@ds157571.mlab.com:57571/ulbra_curso_node');


app.use((req, res, next) => {
  console.log("https://media.giphy.com/media/1081l2F7uGjkK4/giphy.gif");
  next();
});

app.use(cors());

app.get('/product', (req, res) => {
  Product.find((error, products) => {
    if (error) res.status(500).json({ error: error });
    else res.json(products);
  });
})

app.post('/product', (req, res) => {
  let product = new Product();

  product.name = req.body.name;
  product.value = req.body.value;

  product.save(error => {
    if (error) res.status(500).json({ error: error });
    else res.json();
  });
})

app.get('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.status(500).json({ error: error });
    else res.json(product);
  });
})

app.put('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) return res.status(500).json({ error: error });
    if (!product) { res.status(404).json({ error: 'Product not found' }) }
    else {
      product.name = req.body.name;
      product.value = req.body.value;

      product.save(error => {
        if (error) res.json({ error: error });
        else res.json();
      });
    }
  })
})

app.delete('/product/:id', (req, res) => {
  Product.remove({ _id: req.params.id }, error => {
    if (error) res.json({ error: error });
    else res.json();
  });
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
});
