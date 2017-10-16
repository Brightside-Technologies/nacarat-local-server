const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);

// GET /products
router.get('/products.json', (req, res) => {
    const products = db
        .get('products')
        .value();

    res.send(products)
});

// GET /products/:id
router.get('/products/:id.json', (req, res) => {
    const product = db
        .get('products')
        .get(req.params.id)
        .value();

    res.send(product)
});
module.exports = router;