// Libraries
const express = require("express");
const { sha512 } = require("js-sha512");
const { validate } = require("email-validator");

// Custom Functions
const User = require("../schema/users");
const generateSalt = require("../helper/token").generateSalt;
const signature = require("../crypto/functions").signature;
const { getUser } = require("../helper/search");
const { generateToken } = require("../helper/token");
const Verify = require("../schema/verification");
const Post = require("../schema/post");

const Router = express.Router();

// FUNCTION: Random 4-digit gen
const generateVerify = (uname, pass, email) => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.ceil(Math.random() * 9).toString();
  }

  return new Verify({
    uname,
    pass: sha512(pass),
    email,
    code,
    time: new Date().getTime(),
  });
};


// ROUTE: /
Router.post("/", async (req, res) => {
  // Body Fields
  const uname = req.body.uname;
  const email = req.body.email;
  const pass = req.body.pass;

  // Responce to return
  const responce = {};

  if (!validate(email)) {
    responce["success"] = false;
    responce["error"] = { msg: "wrong email format", code: 1 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  // if special chars in username other than _
  for (let i of uname) {
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
  if (await getUser(uname)) {
    responce["success"] = false;
    responce["error"] = { msg: "username already exists", code: 4 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  // If email found in DB
  if (await getUser(email)) {
    responce["success"] = false;
    responce["error"] = { msg: "email already exists", code: 5 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  // if already a code present - means "resend code" req
  const activeCode = await Verify.findOne({ email });
  if (activeCode) {
    const createdTime = (new Date().getTime() - activeCode.time) / 1000;

    if (createdTime < 10) {
      responce["success"] = false;
      responce["error"] = { msg: "wait 10s before resending code", code: 8 };
      return res.json({ ...responce, signature: signature(responce) });
    }

    await Verify.deleteOne({ email });
    const code = (await generateVerify(uname, pass, email).save()).code;
    responce["success"] = true;
    responce["code"] = code;
    responce["msg"] = "Verify Your Request";
    return res.json({ ...responce, signature: signature(responce) });
  }

  // if no code is present previously
  const code = (await generateVerify(uname, pass, email).save()).code;
  responce["success"] = true;
  responce["code"] = code;
  responce["msg"] = "Verify Your Request";
  return res.json({ ...responce, signature: signature(responce) });
});


// ROUTE: /verify
Router.post("/verify", async (req, res) => {
  // Body Fields
  const email = req.body.email;
  const code = req.body.code;
  const responce = {};

  // if already a code present - means "resend code" req
  const activeVerify = await Verify.findOne({ email });

  if (!activeVerify) {
    responce["success"] = false;
    responce["error"] = { msg: "no code is send for this email", code: 6 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (code !== activeVerify.code) {
    responce["success"] = false;
    responce["error"] = { msg: "wrong verification code", code: 7 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  // Generating Salt for password
  const salt = generateSalt();

  const userTemplate = new User({
    uname: activeVerify.uname,
    email: activeVerify.email,
    pass: sha512(activeVerify.pass + salt),
    salt,
  });

  const user = await userTemplate.save();
  const token = (await generateToken(user)).token;
  await Verify.deleteOne({ email });
  const PostTemplate = new Post({
    _id: user.id,
    posts: [],
    comments: [],
    actions: []
  });
  await PostTemplate.save();
  responce["success"] = true;
  responce["userId"] = user.id;
  responce["token"] = token;
  return res.json({ ...responce, signature: signature(responce) });
});

module.exports = Router;
