const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);

//GET
router.get('/businesses/:businessId/inventories.json', (req, res) => {
    const inventories = db
        .get('businesses')
        .get(req.params.businessId)
        .get('inventories')
        .value();

    res.send(inventories);
})

//GET
router.get('/businesses/:businessId/inventories/:inventoryId.json', (req, res) => {

    const inventory = db
        .get('businesses')
        .get(req.params.businessId)
        .get('inventories')
        .get(req.params.inventoryId)
        .value();

    res.send(inventory);
})

//POST
router.post('/businesses/:businessId/inventories.json', (req, res) => {

    db.get('businesses')
        .get(req.params.businessId)
        .get('inventories')
        .assign(req.body)
        .write();

    res.send({
        "status": 200
    });
})

module.exports = router;