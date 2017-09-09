const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);
//console.log('db', db);
// Create server
const app = express()

// Routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//************* PRODUCTS **************//
// GET /products
app.get('/products', (req, res) => {
  const products = db.get('products')
    .value()
  res.send(products)
})

// GET /posts/:id
app.get('/products/:id', (req, res) => {
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
// GET /vendors
app.get('/vendors', (req, res) => {
  const vendors = db.get('vendors')
    .value()
  res.send(vendors)
})

// GET /posts/:id
app.get('/vendors/:id', (req, res) => {
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
app.listen(3000, () => console.log('listening on port 3000'))
