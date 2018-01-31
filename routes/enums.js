const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

router.get("/nacarat/enums/socialMediaTypes.json", (req, res) => {
    const socialMediaTypes = db
        .get("nacarat")
        .get("enums")
        .get("socialMediaTypes")
        .value();

    res.send(socialMediaTypes);
});

router.get("/nacarat/enums/businessTypes.json", (req, res) => {
    const businessTypes = db
        .get("nacarat")
        .get("enums")
        .get("businessTypes")
        .value();

    res.send(businessTypes);
});

module.exports = router;
