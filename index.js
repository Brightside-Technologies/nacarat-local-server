const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();

// config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//************* PRODUCTS **************//
// GET /products
app.get('/products.json', (req, res) => {
        const products = db.get('products')
            .value()
        res.send(products)
    })
    // GET /products/:id
app.get('/products/:id' + '.json', (req, res) => {
        const products = db.get('products')
            .value()

        const product = products[req.params.id];
        res.send(product)
    })
    //**************************************//

//************* VENDORS **************//
// GET - get all vendors
app.get('/vendors.json', (req, res) => {
    const vendors = db
        .get('vendors')
        .value()
    res.send(vendors)
});
// GET - get vendor by vendorId
app.get('/vendors/:vendorId.json', (req, res) => {
    const vendor = db
        .get('vendors')
        .get(req.params.vendorId)
        .value();

    res.send(vendor)
});
// PUT - Update About by :vendorId
app.put('/vendors/:vendorId/profile/about.json', (req, res) => {
    db.get('vendors')
        .get(req.params.vendorId)
        .get('profile')
        .get('about')
        .assign(req.body)
        .write();

    res.send({ "status": 200 })
});
// PUT - update social media by :vendorId and :type
app.put('/vendors/:vendorId/profile/socialMedias/:type.json', (req, res) => {
    db.get('vendors')
        .get(req.params.vendorId)
        .get('profile')
        .get('socialMedias')
        .get(req.params.type)
        .assign(req.body)
        .write();

    res.send({ "status": 200 })
});
//**************************************//

//************* Inventories **************//
// GET /inventory
app.get('/vendors/:vendorId/inventories.json', (req, res) => {
    const vendors = db.get('vendors')
        .value()
    const vendor = vendors[req.params.vendorId];
    const inventories = vendor.inventories;
    res.send(inventories)
})

// GET /inventory/:id
app.get('/vendors/:vendorId/inventories/:inventoryId' + '.json', (req, res) => {
    console.log('req.params', req.params)
    const vendors = db.get('vendors')
        .value()
    const vendor = vendors[req.params.vendorId];
    const inventories = vendor.inventories;

    const inventory = inventories[req.params.inventoryId];
    res.send(inventory)
})

//POST /posts
app.post('/vendors/:vendorId/inventories.json', (req, res) => {
    console.log('req', req);
    var vendors = db
        .get('vendors')
        .get(req.params.vendorId)
        .get('inventories')
        .assign(req.body)
        .write()
    res.send({
        "status": 200
    })

    // db.get('vendors')
    //   .push(req.body)
    //   .last()
    //   .assign({ id: Date.now() })
    //   .write()
    //   .then(post => res.send(post))
})

//**************************************//


//************* Users **************//

// GET /users/:id
app.get('/users/:userId' + '.json', (req, res) => {
    console.log('req.params', req.params)
    const users = db.get('users')
        .value()
    const user = users[req.params.userId];

    res.send(user)
})

//**************************************//

app.get('/foos', (req, res) => {
    const vendors = db
        .get('vendors')
        .get('8b9846d7-9df4-440c-8bbc-88b8a9fc7217')
        .get('profile')
        .value()
    console.log('vendors', vendors)

    res.send(vendors)
})
app.post('/foos', (req, res) => {
    db.get('posts')
        .push({ id: 1, title: 'lowdb is awesome' })
        .write()
    res.send({
        "status": 200
    })
})
app.listen(3000, () => console.log('listening on port 3000'))