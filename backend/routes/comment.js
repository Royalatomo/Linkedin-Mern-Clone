const express = require("express");
const { signature } = require("../crypto/functions");
const Router = express.Router();
const { validateToken } = require("../helper/token");
const Post = require("../schema/post");
const { binarySearch, binaryUpdateComment } = require("../helper/search");

Router.use("/reply", require("./reply"));

Router.get("/", validateToken, async (req, res) => {
  const userId = req.query.userId || req.body.activeSessionId;
  const postId = req.query.postId;
  const commentLength = parseInt(req.query.comment) || 1;
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
  const postComment = binarySearch(allPostComments, parseInt(postId))?.comments;
  if (!postComment || postComment.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No comment for this post", code: 17 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (!postComment) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid Post Id", code: 15 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const totalPages = Math.ceil(postComment.length / commentLength);

  const pageEndIndex = commentLength * pageIndex;
  if (pageIndex > totalPages) {
    responce["success"] = false;
    responce["error"] = { msg: "Page out of index", code: 13 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  responce["success"] = true;
  responce["userId"] = userId;
  responce["comment"] = [];

  if (totalPages === pageIndex) {
    for (let i = pageEndIndex - commentLength; i < postComment.length; i++) {
      delete postComment[i].reply;
      responce["comment"].push(postComment[i]);
    }
  } else {
    for (let i = pageEndIndex - commentLength; i < pageEndIndex; i++) {
      delete postComment[i].reply;
      responce["comment"].push(postComment[i]);
    }
  }

  responce["currentPages"] = pageIndex;
  responce["totalPages"] = totalPages;
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/", validateToken, async (req, res) => {
  const userId = req.body.userId || req.body.activeSessionId;
  const postingUser = req.body.activeSessionId;
  const postId = req.body.postId;
  const text = req.body.text;
  const responce = {};

  if ((postId !== 0 && !postId) || !text) {
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

  const post = binarySearch(userPostItem.posts, parseInt(postId));
  if (!post) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid Post Id", code: 15 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPostComments = userPostItem.comments || [];
  const postComment = binarySearch(allPostComments, parseInt(postId));

  const commentLength = postComment.comments.length;
  let _id = 0;
  if (commentLength > 0) {
    _id = parseInt(postComment.comments[0]._id) + 1;
  }
  const newPostComment = [
    { _id: _id, userId: postingUser, text: text, totalReplies: 0, reply: [] },
    ...postComment.comments,
  ];

  const postCommentItem = binaryUpdateComment(
    allPostComments,
    parseInt(postId),
    newPostComment
  );

  const allPosts = userPostItem.posts;
  for (let post of allPosts) {
    if (parseInt(postId) === post._id) {
      post.totalComments = newPostComment.length;
      break;
    }
  }
  await Post.findOneAndUpdate(
    { _id: userId },
    { posts: allPosts, comments: postCommentItem }
  );
  responce["success"] = true;
  responce["_id"] = _id;
  responce["msg"] = "comment posted";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/", validateToken, async (req, res) => {
  const userId = req.query.userId;
  const actualUser = req.body.activeSessionId;
  const postId = req.query.postId;
  const commentId = req.query.commentId;
  const responce = {};

  if (postId === undefined) {
    responce["success"] = false;
    responce["error"] = { msg: "No postId found", code: 22 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const post = binarySearch(userPostItem.posts, parseInt(postId));
  if (!post) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid Post Id", code: 15 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPostComments = userPostItem.comments || [];
  const postComment = binarySearch(allPostComments, parseInt(postId));

  const newPostComment = [];
  for (let comment of postComment.comments) {
    if (comment._id !== parseInt(commentId)) {
      newPostComment.push(comment);
    } else {
      if (comment.userId !== actualUser) {
        responce["success"] = false;
        responce["error"] = { msg: "Unauthozed Request", code: 9 };
        return res.json({ ...responce, signature: signature(responce) });
      }
    }
  }

  const postCommentItem = binaryUpdateComment(
    allPostComments,
    parseInt(postId),
    newPostComment
  );
  const allPosts = userPostItem.posts;
  for (let post of allPosts) {
    if (parseInt(postId) === post._id) {
      post.totalComments = newPostComment.length;
      break;
    }
  }
  await Post.findOneAndUpdate(
    { _id: userId },
    { posts: allPosts, comments: postCommentItem }
  );
  responce["success"] = true;
  responce["msg"] = "comment removed";
  return res.json({ ...responce, signature: signature(responce) });
});

module.exports = Router;
