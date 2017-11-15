const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();

// require routes
var merchantsRoutes = require('./routes/merchants');
var businessesRoutes = require('./routes/businesses');
var usersRoutes = require('./routes/users');
var productsRoutes = require('./routes/products');
var inventoriesRoutes = require('./routes/inventories');
var enumsRoutes = require('./routes/enums');

// config
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', merchantsRoutes);
app.use('/', usersRoutes);
app.use('/', productsRoutes);
app.use('/', businessesRoutes);
app.use('/', inventoriesRoutes);
app.use('/', enumsRoutes);

app.listen(3000, () => console.log('listening on port 3000'))