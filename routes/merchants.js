const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);
var _ = require('lodash');

// GET /merchants
router.get('/merchants.json', (req, res) => {

    var merchants = db
        .get('merchants')
        .value();

    if (req.query) {
        var merchantId = _.findKey(merchants, {
            'userId': req.query.equalTo.replace(/"/g, "")
        });
        var merchantObj = {};
        merchantObj[merchantId] = merchants[merchantId];
        merchants = merchantObj;
    }

    res.send(merchants);
});

// GET /merchants/:id
router.get('/merchants/:merchantId.json', (req, res) => {
    const merchant = db
        .get('merchants')
        .get(req.params.merchantId)
        .value();

    res.send(merchant);
});

module.exports = router;