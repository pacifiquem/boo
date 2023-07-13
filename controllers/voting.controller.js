const CommentModel = require("../models/comments.model");
const HttpStatus = require("../utils/https_statuses.util");

module.exports.vote = async (req, res, next) => {
  let { voteValue, author, category } = req.body;
  let commentId = req.params.commentId;

  try {
    let comment = await CommentModel.findById(commentId);
    if (!comment) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `Comment with id ${commentId} was not found`,
      });
    } else {

      let vote = {
        category: category,
        value: voteValue,
        author: author,
      };

      comment.votes.push(vote);

      await comment.save();

      res.status(HttpStatus.OK).json({
        success: true,
        data: comment,
      });
    }
  } catch (error) {
    next(error);
  }
};


module.exports.getVotesForaGivenCategory = async (req, res, next) => {

    let commentId = req.params.commentId;
    let category = req.params.category;

    try {

      let comment = await CommentModel.findById(commentId);
      if (!comment) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: `Comment with id ${commentId} was not found`,
        });
      } else {

        let votes = comment.votes.filter(vote => {
            return vote.category == category
        });

        return res.status(HttpStatus.OK).json({
            success: true,
            data: {
                votes,
                totalNumber: votes.length
            },
        });

      }

    } catch (error) {
      next(error);
    }
};