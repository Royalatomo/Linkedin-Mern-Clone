const express = require("express");
const User = require("../../schema/users");
const signature = require("../../crypto/functions").signature;
const { getUser } = require("../../helper/search");
const { validateToken } = require("../../helper/token");
const Post = require("../../schema/post");

const Router = express.Router();

// uname, headline, bgImg, profileImg
Router.post("/info", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const uname = req.body.uname;
  const headline = req.body.headline;
  const bgImg = req.body.bgImg;
  const profileImg = req.body.profileImg;
  const responce = {};

  // if special chars in username other than _
  for (let i of uname || "") {
    const ascii = i.charCodeAt(0);
    const allNums = ascii > 47 && ascii < 58;
    const allCapChar = ascii > 64 && ascii < 91;
    const allSmallChar = ascii > 96 && ascii < 123;
    const underScore = ascii === 95;

    if (!(allNums || allCapChar || allSmallChar || underScore)) {
      responce["success"] = false;
      responce["error"] = { msg: "wrong username format", code: 0 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  // If username found in DB
  if (uname !== undefined && (await getUser(uname))) {
    responce["success"] = false;
    responce["error"] = { msg: "username already exists", code: 4 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const userDB = await User.findOne({ _id: actualUser });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const updates = {
    uname: uname === undefined ? userDB.uname : uname,
    headline: headline === undefined ? userDB.headline : headline,
    bgImg: bgImg === undefined ? userDB.bgImg : bgImg,
    profileImg: profileImg === undefined ? userDB.profileImg : profileImg,
  };

  await User.findOneAndUpdate({ _id: actualUser }, { ...updates });
  responce["success"] = true;
  responce["msg"] = "User updated";
  return res.json({ ...responce, signature: signature(responce) });
});

// Follow & Following
Router.post("/following", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });
  for (let following of actualUserDB.following) {
    if (following === userId) {
      responce["success"] = false;
      responce["error"] = { msg: "User already followed", code: 21 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  await User.findOneAndUpdate(
    { _id: userId },
    { followers: [...userDB.followers, actualUser] }
  );
  await User.findOneAndUpdate(
    { _id: actualUser },
    { following: [...actualUserDB.following, userId] }
  );

  responce["success"] = true;
  responce["msg"] = "User updated";
  res.json({ ...responce, signature: signature(responce) });

  const posts = (await Post.findOne({ _id: userId })).posts;
  const allPosts = [];
  for (let post of posts) {
    allPosts.push({ _id: userId, post: post._id });
  }

  const feed = (await Post.findOne({ _id: actualUser })).feed;
  await Post.findOneAndUpdate(
    { _id: actualUser },
    { feed: [...allPosts, ...feed] }
  );
});

Router.delete("/follow", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });

  if (actualUserDB.followers.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No user in followers", code: 23 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let i = 0; i < actualUserDB.followers.length; i++) {
    if (actualUserDB.followers[i] === userId) {
      break;
    }
    if (i + 1 === actualUserDB.followers.length) {
      responce["success"] = false;
      responce["error"] = { msg: "No user in followers", code: 23 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const newFollowings = [];
  const newFollowers = [];
  actualUserDB.followers.forEach((follower) => {
    if (follower !== userId) newFollowers.push(follower);
  });
  userDB.following.forEach((following) => {
    if (following !== actualUser) newFollowings.push(following);
  });

  await User.findOneAndUpdate({ _id: userId }, { following: newFollowings });
  await User.findOneAndUpdate({ _id: actualUser }, { followers: newFollowers });

  responce["success"] = true;
  responce["msg"] = "User updated";
  res.json({ ...responce, signature: signature(responce) });
  const feedPosts = (await Post.findOne({ _id: userId })).feed;
  const filPosts = [];
  for (let post of feedPosts) {
    if (post._id !== actualUser) {
      filPosts.push({ post });
    }
  }

  await Post.findOneAndUpdate({ _id: userId }, { feed: filPosts });
});

Router.delete("/following", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }
  const actualUserDB = await User.findOne({ _id: actualUser });

  if (actualUserDB.following.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No user in following", code: 24 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let i = 0; i < actualUserDB.following.length; i++) {
    if (actualUserDB.following[i] === userId) {
      break;
    }
    if (i + 1 === actualUserDB.following.length) {
      responce["success"] = false;
      responce["error"] = { msg: "No user in following", code: 24 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const newFollowings = [];
  const newFollowers = [];
  actualUserDB.following.forEach((following) => {
    if (following !== userId) newFollowings.push(following);
  });
  userDB.followers.forEach((follower) => {
    if (follower !== actualUser) newFollowers.push(follower);
  });

  await User.findOneAndUpdate({ _id: userId }, { followers: newFollowers });
  await User.findOneAndUpdate(
    { _id: actualUser },
    { following: newFollowings }
  );

  responce["success"] = true;
  responce["msg"] = "User updated";
  res.json({ ...responce, signature: signature(responce) });

  const feedPosts = (await Post.findOne({ _id: actualUser })).feed;
  const filPosts = [];
  for (let post of feedPosts) {
    if (post._id !== userId) {
      filPosts.push(post);
    }
  }

  await Post.findOneAndUpdate({ _id: actualUser }, { feed: filPosts });
});

Router.post("/add-network", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });
  for (let requests of actualUserDB.sendReqs) {
    if (requests === userId) {
      responce["success"] = false;
      responce["error"] = { msg: "Request already send", code: 25 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  for (let network of actualUserDB.networks) {
    if (network === userId) {
      responce["success"] = false;
      responce["error"] = { msg: "User Already in Network", code: 26 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  await User.findOneAndUpdate(
    { _id: userId },
    { networkReqs: [...userDB.networkReqs, actualUser] }
  );

  await User.findOneAndUpdate(
    { _id: actualUser },
    { sendReqs: [...actualUserDB.sendReqs, userId] }
  );

  responce["success"] = true;
  responce["msg"] = "User updated";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/accept-network", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });

  if (actualUserDB.networkReqs.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No user in network reqs", code: 27 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let i = 0; i < actualUserDB.networkReqs.length; i++) {
    if (actualUserDB.networkReqs[i] === userId) {
      break;
    }
    if (i + 1 === actualUserDB.networkReqs.length) {
      responce["success"] = false;
      responce["error"] = { msg: "No user in network reqs", code: 27 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const newNetworkReqs = [];
  actualUserDB.networkReqs.forEach((request) => {
    if (request !== userId) newNetworkReqs.push(request);
  });

  const newSendReqs = [];
  userDB.sendReqs.forEach((request) => {
    if (request !== actualUser) newSendReqs.push(request);
  });

  await User.findOneAndUpdate(
    { _id: actualUser },
    {
      networkReqs: newNetworkReqs,
      networks: [...actualUserDB.networks, userId],
    }
  );

  await User.findOneAndUpdate(
    { _id: userId },
    { sendReqs: newSendReqs, networks: [...userDB.networks, actualUser] }
  );

  responce["success"] = true;
  responce["msg"] = "User updated";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/remove-request", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });

  if (actualUserDB.networkReqs.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No user in network reqs", code: 27 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let i = 0; i < actualUserDB.networkReqs.length; i++) {
    if (actualUserDB.networkReqs[i] === userId) {
      break;
    }
    if (i + 1 === actualUserDB.networkReqs.length) {
      responce["success"] = false;
      responce["error"] = { msg: "No user in network reqs", code: 27 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const newNetworkReqs = [];
  actualUserDB.networkReqs.forEach((request) => {
    if (request !== userId) newNetworkReqs.push(request);
  });

  const newSendReqs = [];
  userDB.sendReqs.forEach((request) => {
    if (request !== actualUser) newSendReqs.push(request);
  });

  await User.findOneAndUpdate(
    { _id: actualUser },
    { networkReqs: newNetworkReqs }
  );

  await User.findOneAndUpdate({ _id: userId }, { sendReqs: newSendReqs });

  responce["success"] = true;
  responce["msg"] = "User updated";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/remove-send-request", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });

  if (actualUserDB.sendReqs.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No user in send reqs", code: 40 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let i = 0; i < actualUserDB.sendReqs.length; i++) {
    if (actualUserDB.sendReqs[i] === userId) {
      break;
    }
    if (i + 1 === actualUserDB.sendReqs.length) {
      responce["success"] = false;
      responce["error"] = { msg: "No user in send reqs", code: 27 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const sendReqs = [];
  actualUserDB.sendReqs.forEach((request) => {
    if (request !== userId) sendReqs.push(request);
  });

  const networkReqs = [];
  userDB.networkReqs.forEach((request) => {
    if (request !== actualUser) networkReqs.push(request);
  });

  await User.findOneAndUpdate({ _id: actualUser }, { sendReqs });

  await User.findOneAndUpdate({ _id: userId }, { networkReqs });

  responce["success"] = true;
  responce["msg"] = "User updated";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.delete("/remove-network", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const userId = req.query.userId;
  const responce = {};

  if (actualUser === userId) {
    responce["success"] = false;
    responce["error"] = { msg: "Choose user other than you", code: 20 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserDB = await User.findOne({ _id: actualUser });

  if (actualUserDB.networks.length < 1) {
    responce["success"] = false;
    responce["error"] = { msg: "No user in network", code: 28 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  for (let i = 0; i < actualUserDB.networks.length; i++) {
    if (actualUserDB.networks[i] === userId) {
      break;
    }
    if (i + 1 === actualUserDB.networks.length) {
      responce["success"] = false;
      responce["error"] = { msg: "No user in network", code: 28 };
      return res.json({ ...responce, signature: signature(responce) });
    }
  }

  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const actualUserNetwork = [];
  actualUserDB.networks.forEach((request) => {
    if (request !== userId) actualUserNetwork.push(request);
  });

  const userNetwork = [];
  userDB.networks.forEach((request) => {
    if (request !== actualUser) userNetwork.push(request);
  });

  await User.findOneAndUpdate(
    { _id: actualUser },
    { networks: actualUserNetwork }
  );

  await User.findOneAndUpdate({ _id: userId }, { networks: userNetwork });

  responce["success"] = true;
  responce["msg"] = "User updated";
  return res.json({ ...responce, signature: signature(responce) });
});

module.exports = Router;
