const express = require("express");
const { signature } = require("../crypto/functions");
const Post = require("../schema/post");
const { validateToken } = require("../helper/token");
const { binarySearch, binaryUpdateReply } = require("../helper/search");

const Router = express.Router();

// PostId -> CommentId -> replies
Router.get("/", validateToken, async (req, res) => {
  const userId = req.query.userId || req.body.activeSessionId;
  const postId = req.query.postId;
  const comment = req.query.commentId;
  const reply = parseInt(req.query.reply) || 1;
  const pageIndex = parseInt(req.query.page) || 1;

  const responce = {};
  if (postId !== 0 && !postId) {
    responce["success"] = false;
    responce["error"] = { msg: "Missing field options", code: 18 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPostComments = userPostItem.comments;
  const postComment = binarySearch(allPostComments, parseInt(postId));

  if (!postComment || postComment.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No comment for this post", code: 17 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const commentReplies = binarySearch(
    postComment.comments,
    parseInt(comment)
  )?.reply;

  if (!commentReplies || commentReplies.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No replies for this comment", code: 19 };
    return res.json({ ...responce, signature: signature(responce) });
  }
  const totalPages = Math.ceil(commentReplies.length / reply);

  const pageEndIndex = reply * pageIndex;
  if (pageIndex > totalPages) {
    responce["success"] = false;
    responce["error"] = { msg: "Page out of index", code: 13 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  responce["success"] = true;
  responce["userId"] = userId;
  responce["comment"] = [];

  if (totalPages === pageIndex) {
    for (let i = pageEndIndex - reply; i < commentReplies.length; i++) {
      responce["comment"].push(commentReplies[i]);
    }
  } else {
    for (let i = pageEndIndex - reply; i < pageEndIndex; i++) {
      responce["comment"].push(commentReplies[i]);
    }
  }

  responce["currentPages"] = pageIndex;
  responce["totalPages"] = totalPages;
  responce["totalReplies"] = commentReplies.length;
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/", validateToken, async (req, res) => {
  const userId = req.body.userId || req.body.activeSessionId;
  const postingUser = req.body.activeSessionId;
  const text = req.body.text;
  const postId = req.body.postId;
  const comment = req.body.commentId;
  const responce = {};

  if (postId === undefined) {
    responce["success"] = false;
    responce["error"] = { msg: "Missing field options", code: 18 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPostComments = userPostItem.comments;
  const postComment = binarySearch(allPostComments, parseInt(postId));

  if (!postComment || postComment.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No comment for this post", code: 17 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const commentReplies =
    binarySearch(postComment.comments, parseInt(comment))?.reply || [];
  const repliesLength = commentReplies.length;
  let _id = 0;
  if (repliesLength > 0) {
    _id = parseInt(commentReplies[0]._id) + 1;
  }

  const replies = [{ _id: _id, userId: postingUser, text }, ...commentReplies];
  for(let postComment of allPostComments){
    if (parseInt(postComment._id) === parseInt(postId)){
      for(let c of postComment.comments) {
        if (parseInt(c._id) === parseInt(comment)){
          c.totalReplies = replies.length;
          break;
        }
      }
    }
  }

  const postCommentItem = binaryUpdateReply(
    allPostComments,
    postId,
    comment,
    replies
  );

  await Post.findOneAndUpdate({ _id: userId }, { comments: postCommentItem });
  responce["success"] = true;
  responce["msg"] = "reply posted";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/", validateToken, async (req, res) => {
  const userId = req.query.userId;
  const actualUser = req.body.activeSessionId;
  const postId = req.query.postId;
  const commentId = req.query.commentId;
  const replyId = req.query.replyId;

  const responce = {};
  if (
    postId === undefined ||
    !userId ||
    postId === undefined ||
    commentId === undefined ||
    replyId === undefined
  ) {
    responce["success"] = false;
    responce["error"] = { msg: "Missing field options", code: 18 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPostComments = userPostItem.comments;
  const postComment = binarySearch(allPostComments, parseInt(postId));

  if (!postComment || postComment.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No comment for this post", code: 17 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const commentReplies =
    binarySearch(postComment.comments, parseInt(commentId))?.reply || [];

  const replies = [];
  for(let reply of commentReplies){
    if (reply._id !== parseInt(replyId)) {
      replies.push(reply);
    } else {
      if (reply.userId !== actualUser) {
        responce["success"] = false;
        responce["error"] = { msg: "Unauthozed Request", code: 9 };
        return res.json({ ...responce, signature: signature(responce) });
      }
    }
  }

  for(let postComment of allPostComments){
    if (postComment._id === parseInt(postId)){
      for(let c of postComment.comments) {
        if (c._id === parseInt(commentId)){
          c.totalReplies = replies.length;
          break;
        }
      }
    }
  }

  const postCommentItem = binaryUpdateReply( allPostComments, parseInt(postId), parseInt(commentId), replies);
  await Post.findOneAndUpdate({ _id: userId }, { comments: postCommentItem });
  responce["success"] = true;
  responce["msg"] = "Reply deleted";
  return res.json({ ...responce, signature: signature(responce) });
});

module.exports = Router;
