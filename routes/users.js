const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// GET /users
router.get("/nacarat/users.json", (req, res) => {
    console.log("req.params", req.params);
    const users = db
        .get("nacarat")
        .get("users")
        .value();

    res.send(users);
});

// GET /users/:id
router.get("/nacarat/users/:userId.json", (req, res) => {
    console.log("req.params", req.params);
    const user = db
        .get("nacarat")
        .get("users")
        .get(req.params.userId)
        .value();

    res.send(user);
});

module.exports = router;
