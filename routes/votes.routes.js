const express = require("express");

const {vote, getVotesForaGivenCategory} = require("../controllers/voting.controller");

const router = express.Router();


router.route("/:commentId").put(vote);
router.route("/:commentId/:category").get(getVotesForaGivenCategory);


module.exports = router;