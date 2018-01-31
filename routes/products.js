const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// GET /products
router.get("/nacarat/products.json", (req, res) => {
    const products = db
        .get("nacarat")
        .get("products")
        .value();

    res.send(products);
});

// GET /products/:id
router.get("/nacarat/products/:id.json", (req, res) => {
    const product = db
        .get("nacarat")
        .get("products")
        .get(req.params.id)
        .value();

    res.send(product);
});
module.exports = router;
