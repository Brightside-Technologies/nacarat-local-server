const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express()

// Routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
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

// POST /posts
// app.post('/posts', (req, res) => {
//   db.get('posts')
//     .push(req.body)
//     .last()
//     .assign({ id: Date.now() })
//     .write()
//     .then(post => res.send(post))
// })

//**************************************//

//************* VENDORS **************//
// GET /vendors.json
app.get('/vendors.json', (req, res) => {
  const vendors = db.get('vendors')
    .value()
  res.send(vendors)
})

// GET /vendors/:id
app.get('/vendors/:id' + '.json', (req, res) => {
  const vendors = db.get('vendors')
    .value()

  const vendor = vendors[req.params.id];
  res.send(vendor)
})

// POST /posts
// app.post('/posts', (req, res) => {
//   db.get('posts')
//     .push(req.body)
//     .last()
//     .assign({ id: Date.now() })
//     .write()
//     .then(post => res.send(post))
// })

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

// POST /posts
// app.post('/posts', (req, res) => {
//   db.get('posts')
//     .push(req.body)
//     .last()
//     .assign({ id: Date.now() })
//     .write()
//     .then(post => res.send(post))
// })

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

app.listen(3000, () => console.log('listening on port 3000'))
