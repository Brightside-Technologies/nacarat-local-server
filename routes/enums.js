const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

router.get("/enums/socialMediaTypes.json", (req, res) => {
    const socialMediaTypes = db
        .get("enums")
        .get("socialMediaTypes")
        .value();

    res.send(socialMediaTypes);
});


module.exports = router;