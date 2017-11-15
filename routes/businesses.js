const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
//const pushid = require('pushid')

// get all businesses
router.get("/businesses.json", (req, res) => {
  const businesses = db.get("businesses").value();

  res.send(businesses);
});

// Get business by id
router.get("/businesses/:businessId.json", (req, res) => {
  const business = db
    .get("businesses")
    .get(req.params.businessId)
    .value();

  res.send(business);
});

// Update businessName by :businessId
router.put("/businesses/:businessId/profile/name.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("name")
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Update About by :businessId
router.put("/businesses/:businessId/profile/about.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("about")
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Update email by :businessId
router.put("/businesses/:businessId/profile/email.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("email")
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Update phone by :businessId
router.put("/businesses/:businessId/profile/phone.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("phone")
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Update hours of operation by :businessId
router.put("/businesses/:businessId/profile/hoursOfOperation.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("hoursOfOperation")
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Update social media by :businessId and :type
router.put("/businesses/:businessId/profile/socialMedias/:type.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("socialMedias")
    .get(req.params.type)
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Update social media by :businessId and :type
router.patch("/businesses/:businessId/profile/socialMedias.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("socialMedias")
    .assign(req.body)
    .write();

  res.send({
    status: 200
  });
});

// Delete social media by :businessId and :type
router.delete("/businesses/:businessId/profile/socialMedias/:type.json", (req, res) => {
  db
    .get("businesses")
    .get(req.params.businessId)
    .get("profile")
    .get("socialMedias")
    .unset(req.params.type)
    .write();

  res.send({
    status: 200
  });
});

module.exports = router;