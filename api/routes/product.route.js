// product.route.js

const express = require('express');
const app = express();
const productRoutes = express.Router();

// Require Product model in our routes module
let Product = require('../models/Product');
const productObj = require('./../controllers/product/product.js');

// Defined store route
/**
   * Api for create new Product
   * @group Product
   * @route POST /add
   * @param {Product.model} product.body.required
   */
productRoutes.post('/add', productObj.addProduct);
/**
   * @typedef Product
   * @property {string} ProductName.required - ProductName for product
   * @property {string} ProductDescription.required - description of product
   * @property {number} ProductPrice.required - price of product
   */

// Defined get data(index or listing) route
productRoutes.get('/', productObj.getProduct);

// Defined edit route
productRoutes.get('/edit/:id', productObj.editProduct);

//  Defined update route
productRoutes.post('/update/:id', productObj.updateProduct);

// Defined delete | remove | destroy route
productRoutes.get('/delete/:id', productObj.deleteProduct);

module.exports = productRoutes;