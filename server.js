const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const marketPlaceRoutes = express.Router();
const ProductModel = require('./model/products.model');
const Categories = require('./model/categories.model');

app.use(cors());
app.use(bodyParser.json());

// Connect DB
mongoose.connect('mongodb+srv://week5:refme8-ceztaq-tarrEr@cluster0.ahhgrjz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("DB connected...");
});

// Generic handling and error handling
const handleError = (err, res, msg = "Error") => {
  console.error(err);
  res.status(400).json({ [msg]: err.message });
};

const handleSuccess = (data, res) => res.status(200).json(data);

// Define routers

// get all products
marketPlaceRoutes.route('/api/products').get((req, res) => {
  ProductModel.find()
    .then(products => handleSuccess(products, res))
    .catch(err => handleError(err, res, 'find all error'));
});

// read specific product by id
marketPlaceRoutes.route('/api/products/:id').get((req, res) => {
  ProductModel.findById(req.params.id)
    .then(product => handleSuccess(product, res))
    .catch(err => handleError(err, res, 'find 1 error'));
});

// post new product
marketPlaceRoutes.route('/api/products').post((req, res) => {
  let newProduct = new ProductModel(req.body);
  newProduct.save()
    .then(product => handleSuccess(product, res))
    .catch(err => handleError(err, res, 'save error'));
});

// put product update
marketPlaceRoutes.route('/api/products/:id').put((req, res) => {
  ProductModel.findById(req.params.id)
    .then(product => {
      Object.assign(product, req.body);
      return product.save();
    })
    .then(updatedProduct => handleSuccess(updatedProduct, res))
    .catch(err => handleError(err, res, 'update error'));
});

// delete 1 product by id
marketPlaceRoutes.route('/api/products/:id').delete((req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: `Product id ${req.params.id} has been deleted.`});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ 'delete 1 error': err });
        });
});

// delete all prodcuts
marketPlaceRoutes.route('/api/products').delete((req, res) => {
    ProductModel.deleteMany({})
        .then(() => {
            res.status(200).json({ message: 'All products have been deleted.' });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ 'delete all error': err });
        });
    });

// start the server
app.use(marketPlaceRoutes);

app.listen(8080, () => {
  console.log("Market Place Server is running on 8080 ...");
});
