const express = require("express");
const { signature } = require("../crypto/functions");
const uuid = require("uuid").v4;
const sha512 = require("js-sha512");
const ImageKit = require("imagekit");

const { validateToken } = require("../helper/token");
const { binarySearch } = require("../helper/search");
const Post = require("../schema/post");
const User = require("../schema/users");
const Router = express.Router();
require("dotenv").config();

Router.use("/comment", require("./comment"));

var imagekit = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMGKIT_ENDPOINT,
});

function getFilteredFeed(feed, user, post) {
  const newFeed = [];
  feed.forEach((item) => {
    if (item._id !== user) {
      newFeed.push(item);
    } else {
      if (parseInt(item.post) !== parseInt(post)) {
        newFeed.push(item);
      }
    }
  });

  return newFeed;
}

Router.get("/", validateToken, async (req, res) => {
  const userId = req.query.userId || req.body.activeSessionId;
  const postLength = parseInt(req.query.post) || 5;
  const pageIndex = parseInt(req.query.page) || 1;
  const responce = {};

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPosts = userPostItem.posts;
  const totalPages = Math.ceil(allPosts.length / postLength);

  const pageEndIndex = postLength * pageIndex;

  if (!totalPages) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (pageIndex > totalPages) {
    responce["success"] = false;
    responce["error"] = { msg: "Page out of index", code: 13 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  responce["success"] = true;
  responce["userId"] = userId;
  responce["post"] = [];

  if (totalPages === pageIndex) {
    for (let i = pageEndIndex - postLength; i < allPosts.length; i++) {
      responce["post"].push(allPosts[i]);
    }
  } else {
    for (let i = pageEndIndex - postLength; i < pageEndIndex; i++) {
      responce["post"].push(allPosts[i]);
    }
  }

  responce["currentPages"] = pageIndex;
  responce["totalPages"] = totalPages;
  return res.json({ ...responce, signature: signature(responce) });
});

Router.get("/one", validateToken, async (req, res) => {
  const userId = req.query.userId || req.body.activeSessionId;
  const postId = parseInt(req.query.postId);
  const responce = {};

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPosts = userPostItem.posts;
  const post = binarySearch(allPosts, parseInt(postId));

  if (!post) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid Post Id", code: 15 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  responce["success"] = true;
  responce["userId"] = userId;
  responce["post"] = post ? post : {};

  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const postTxt = req.body.text || [];
  const postImgs = req.body.postImgs || [];

  const responce = {};
  if (postTxt.length < 1 && postTxt.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "Either give text or imgs", code: 14 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const newPost = {};

  const date = new Date();
  newPost._id = 0;
  newPost.text = postTxt;
  newPost.hashtags = [];
  newPost.postImgs = postImgs;

  newPost.time = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };

  newPost.action = {
    like: 0,
    celebrate: 0,
    support: 0,
    love: 0,
    insightful: 0,
    curious: 0,
    share: 0,
  };

  newPost.totalActions = 0;
  newPost.totalComments = 0;

  const userPosts = await Post.findOne({ _id: userId });

  if (!userPosts) {
    const PostTemplate = new Post({
      _id: userId,
      posts: [newPost],
      comments: [{ _id: newPost._id, comments: [] }],
    });
    await PostTemplate.save();

    responce["success"] = true;
    responce["msg"] = "post created";
    return res.json({ ...responce, signature: signature(responce) });
  }

  const postLength = userPosts.posts.length;
  if (postLength > 0) {
    newPost._id = parseInt(userPosts.posts[0]._id) + 1;
  }

  await Post.findOneAndUpdate(
    { _id: userId },
    {
      posts: [newPost, ...userPosts.posts],
      comments: [{ _id: newPost._id, comments: [] }, ...userPosts.comments],
    }
  );

  responce["success"] = true;
  responce["msg"] = "post created";
  res.json({ ...responce, signature: signature(responce) });

  const user = await User.findOne({ _id: userId });
  const followers = user.followers;

  for (let follower of followers) {
    const feed = (await Post.findOne({ _id: follower })).feed;
    await Post.findOneAndUpdate(
      { _id: follower },
      { feed: [{ _id: userId, post: newPost._id }, ...feed] }
    );
  }
});

Router.get("/action", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const postId = req.query.postId;
  const responce = {};

  const userActions = (await Post.findOne({ _id: actualUser })).actions;

  responce["success"] = false;
  for (let user of userActions) {
    if (user._id === userId) {
      for (let post of user.posts) {
        if (parseInt(post._id) === parseInt(postId)) {
          responce["success"] = true;
          responce["action"] = post.action;
          return res.json({ ...responce, signature: signature(responce) });
        }
      }
      responce["error"] = { msg: "No post found", code: 32 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  responce["error"] = { msg: "No user found", code: 33 };
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/action", validateToken, async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const actualUser = req.body.activeSessionId;
  const option = req.body.option;
  const responce = {};

  if (option === undefined) {
    responce["success"] = false;
    responce["error"] = { msg: "No option specified", code: 34 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await Post.findOne({ _id: actualUser });
  if (!actualUserDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid Posting user Id", code: 35 };
    return res.json({ ...responce, signature: signature(responce) });
  }
  const actualUsersAction = actualUserDB.actions;

  const userPosts = await Post.findOne({ _id: userId });
  if (!userPosts) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user Id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPosts = userPosts.posts;
  const post = binarySearch(allPosts, parseInt(postId));

  if (!post) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid Post Id", code: 15 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const found = { user: false, post: false, action: "" };

  for (let users of actualUsersAction) {
    if (users._id === userId) {
      found.user = true;
      for (let post of users.posts) {
        if (parseInt(post._id) === parseInt(postId)) {
          found.post = true;
          found.action = post.action;
          if (found.action === option) {
            responce["success"] = true;
            responce["msg"] = "added";
            return res.json({ ...responce, signature: signature(responce) });
          }
          delete post.action;
          post.action = option;
          break;
        }
      }

      if (!found.post) {
        if (!post) {
          responce["success"] = false;
          responce["error"] = { msg: "Invalid post Id", code: 15 };
          return res.json({ ...responce, signature: signature(responce) });
        }
        users.posts.push({ _id: postId, action: option });
      }
      break;
    }
  }

  if (!found.user) {
    if (!post) {
      responce["success"] = false;
      responce["error"] = { msg: "Invalid post Id", code: 15 };
      return res.json({ ...responce, signature: signature(responce) });
    }

    actualUsersAction.push({
      _id: userId,
      posts: [{ _id: postId, action: option }],
    });
  }

  for (let post of allPosts) {
    if (parseInt(post._id) === parseInt(postId)) {
      const optionValue = post.action[option];
      if (optionValue === undefined) {
        responce["success"] = false;
        responce["error"] = { msg: "Invalid action option", code: 36 };
        return res.json({ ...responce, signature: signature(responce) });
      }
      if (found.post) {
        post.action[found.action] = parseInt(post.action[found.action]) - 1;
      }

      post.action[option] = parseInt(optionValue) + 1;

      if (!found.post) {
        post.totalActions = parseInt(post.totalActions) + 1;
      }
      break;
    }
  }

  await Post.findOneAndUpdate(
    { _id: actualUser },
    { actions: actualUsersAction }
  );
  await Post.findOneAndUpdate({ _id: userId }, { posts: allPosts });
  responce["success"] = true;
  responce["msg"] = "added";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/action", validateToken, async (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  const actualUser = req.body.activeSessionId;
  const responce = {};

  const actualUsersAction = (await Post.findOne({ _id: actualUser })).actions;

  const userPosts = await Post.findOne({ _id: userId });
  if (!userPosts) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user Id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const found = { user: false, post: false, action: "" };

  for (let users of actualUsersAction) {
    if (users._id === userId) {
      found.user = true;
      for (let post of users.posts) {
        if (parseInt(post._id) === parseInt(postId)) {
          found.post = true;
          found.action = post.action;
          break;
        }
      }

      if (found.post) {
        const posts = [];
        users.posts.forEach((post) => {
          if (parseInt(post._id) !== parseInt(postId)) posts.push(post);
        });

        users.posts = posts;
      } else {
        responce["success"] = false;
        responce["error"] = { msg: "No action on this post", code: 37 };
        return res.json({ ...responce, signature: signature(responce) });
      }
    }
  }

  if (!found.user) {
    responce["success"] = false;
    responce["error"] = { msg: "No action for this user", code: 38 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const posts = userPosts.posts;
  for (let post of posts) {
    if (parseInt(post._id) === parseInt(postId)) {
      post.action[found.action] = parseInt(post.action[found.action]) - 1;
      post.totalActions = parseInt(post.totalActions) - 1;
      break;
    }
  }

  await Post.findOneAndUpdate(
    { _id: actualUser },
    { actions: actualUsersAction }
  );

  await Post.findOneAndUpdate({ _id: userId }, { posts });
  responce["success"] = true;
  responce["msg"] = "added";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const postId = req.query.postId;
  const responce = {};

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (postId === undefined) {
    responce["success"] = false;
    responce["error"] = { msg: "No postId found", code: 22 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPosts = userPostItem.posts;
  const post = binarySearch(allPosts, parseInt(postId));
  if (!post) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid post Id", code: 15 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let img of post.postImgs) {
    const imgSplit = img.split("/");
    const imgName = imgSplit[imgSplit.length - 1];
    imagekit.listFiles(
      { searchQuery: `name="${imgName}"` },
      function (fError, files) {
        if (fError) console.log(fError);
        const fileId = files[0]?.fileId;
        if (!fileId) return;
        imagekit.deleteFile(fileId, function (error, result) {
          if (error) console.log(error);
        });
      }
    );
  }

  const userPosts = await Post.findOne({ _id: userId });
  const newPosts = [];
  userPosts.posts.forEach((post) => {
    if (post._id !== parseInt(postId)) {
      newPosts.push(post);
    }
  });

  const newComments = [];
  userPosts.comments.forEach((comment) => {
    if (comment._id !== parseInt(postId)) {
      newComments.push(comment);
    }
  });

  await Post.findOneAndUpdate(
    { _id: userId },
    {
      posts: newPosts,
      comments: newComments,
    }
  );

  responce["success"] = true;
  responce["msg"] = "post deleted";
  res.json({ ...responce, signature: signature(responce) });

  const user = await User.findOne({ _id: userId });
  const followers = user.followers;

  for (let follower of followers) {
    const userFeed = (await Post.findOne({ _id: follower })).feed;
    const newFeed = getFilteredFeed(userFeed, userId, postId);
    await Post.findOneAndUpdate({ _id: follower }, { feed: newFeed });
  }
});

Router.post("/image", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const responce = {};

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "No post for this user", code: 12 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const postLength = userPostItem.posts.length;
  const fileName = `${userId}-${postLength}`;

  // validating extension
  const validExtension = ["gif", "png", "jpg", "jpeg", "webp"];
  for (let i = 0; i < validExtension.length; i++) {
    if (validExtension[i] === req.body.extension) {
      break;
    }

    if (i + 1 === validExtension.length) {
      responce["success"] = false;
      responce["error"] = { msg: "Invalid Extension", code: 30 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  imagekit.upload(
    {
      file: req.body.data.split("base64,")[1], //required
      fileName: `${fileName}.${req.body.extension}`, //required
    },
    function (error, result) {
      if (error) {
        responce["success"] = true;
        responce["error"] = { msg: "Something went wrong", code: 31 };
        return res.json({ ...responce, signature: signature(responce) });
      }

      responce["success"] = true;
      responce["link"] = result.url;
      return res.json({ ...responce, signature: signature(responce) });
    }
  );
});

module.exports = Router;
