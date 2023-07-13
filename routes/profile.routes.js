'use strict';

const express = require('express');
const router = express.Router();
const profiles = require("../utils/profileData.utils");


module.exports = function() {

  router.get('/*', function(req, res, next) {
    res.render('profile_template', {
      profile: profiles[0],
    });
  });

  return router;
}