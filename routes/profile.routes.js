"use strict";

const express = require("express");
const router = express.Router();
const {
  getAllProfiles,
  createProfile,
  getProfileById
} = require("../controllers/profile.controller");

router
  .route("/")
  .get(getAllProfiles)
  .post(createProfile);

router.route("/:profileId").get(getProfileById);

module.exports = router;