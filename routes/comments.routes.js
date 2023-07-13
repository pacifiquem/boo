"use strict";

const express = require("express");
const router = express.Router();
const {
    addComment,
    getCommentForProfile,
    updateComment,
    likeComment,
    getCommentById
} = require("../controllers/comments.controller");
router
  .route("/:profileId")
  .get(getCommentForProfile)
  .post(addComment);

router.route("/update/:commentId").put(updateComment);
router.route("/get/:commentId").get(getCommentById);

router
    .route("/:profileId/:commentId")
    .put(likeComment);

module.exports = router;