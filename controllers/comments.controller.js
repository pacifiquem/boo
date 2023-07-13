const CommentModel = require("../models/comments.model");
const HttpStatus = require("../utils/https_statuses.util");

module.exports.getCommentById = async (req, res, next) => {
    let commentId = req.params.commentId;
    try {
        let comment = await CommentModel.findById(commentId);
        if(comment) {
            res.status(HttpStatus.OK).json({
                success: true,
                data: comment
            });
        }else {
            res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: `Comment with id ${commentId} was not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports.getCommentForProfile = async (req, res, next) => {
    let profileId = req.params.profileId;
    try {

      const page = Number.parseInt(req.query.page) || 1;
      const limit = Number.parseInt(req.query.limit) || 10;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const totalComments = await CommentModel.countDocuments();
      const totalPages = Math.ceil(totalComments / limit);
  
      let comments = await CommentModel.find({
        author: profileId
      }).skip(startIndex).limit(limit).sort();
  
      res.status(HttpStatus.OK).json({
        success: true,
        data: {
            page,
            limit,
            totalPages,
            totalComments,
            comments
        }
      });

    } catch (error) {
        next(error);
    }
}

module.exports.addComment = async (req, res, next) => {

  const comment = new CommentModel({
    author: req.params.profileId,
    title: req.body.title,
    description: req.body.description,
    mbti: req.body.mbti,
    enneagram: req.body.enneagram,
    zodiac: req.body.zodiac,
  });

  try {
    await comment.save();
    res.status(201).json({
      message: 'Comment created successfully',
      comment,
    });
  } catch (error) {
    next(error);
  }
};

//like a comment
module.exports.likeComment = async (req, res, next) => {

  const commentId = req.params.commentId;
  const profileId = req.params.profileId;

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: `Comment with id ${commentId} was not found`
      });
      return;
    }

    comment.likes.push(profileId);
    await comment.save();

    res.status(200).json({
      message: 'Comment liked successfully',
    });
  } catch (error) {
    next(error);
  }
};

//update a comment
module.exports.updateComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const comment = await CommentModel.findById(commentId);
  
    if (!comment) {
      res.status(404).json({
        message: 'Comment not found',
      });
      return;
    }
  
    comment.title = req.body.title || comment.title;
    comment.description = req.body.description || comment.description;
  
    try {
      await comment.save();
      res.status(200).json({
        message: 'Comment updated successfully',
        comment,
      });
    } catch (error) {
        next(error);
    }
};
