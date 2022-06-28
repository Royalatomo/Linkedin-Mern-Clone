const express = require("express");
const Router = express.Router();
const { sha512 } = require("js-sha512");
const { validate } = require("email-validator");
const generateSalt = require("../../helper/token").generateSalt;
const Forgot = require("../../schema/forgot");
const { signature } = require("../../crypto/functions");
const { getUser } = require("../../helper/search");
const User = require("../../schema/users");

// FUNCTION: Random 4-digit gen
const generateVerify = (email) => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.ceil(Math.random() * 9).toString();
  }

  return new Forgot({
    email,
    code,
    time: new Date().getTime(),
  });
};

// ROUTE: /
Router.post("/", async (req, res) => {
  // Body Fields
  const username = req.query.user;

  // Responce to return
  const responce = {};

  // Getting user with email/name
  const user = await getUser(username);
  
  // if no user found
  if (!user || user.length <= 0) {
    responce["success"] = false;
    responce["error"] = { msg: "Username/Email not found", code: 2 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  // if already a code present - means "resend code" req
  const activeCode = await Forgot.findOne({ email: user.email });
  if (activeCode) {
    const createdTime = (new Date().getTime() - activeCode.time) / 1000;

    if (createdTime < 10) {
      responce["success"] = false;
      responce["error"] = { msg: "wait 10s before resending code", code: 8 };
      return res.json({ ...responce, signature: signature(responce) });
    }

    await Forgot.deleteOne({ email: user.email });
    const code = (await generateVerify(user.email).save()).code;
    responce["success"] = true;
    responce["code"] = code;
    responce["msg"] = "Verify Your Request";
    return res.json({ ...responce, signature: signature(responce) });
  }

  const code = (await generateVerify(user.email).save()).code;
  responce["success"] = true;
  responce["code"] = code;
  responce["msg"] = "Verify Your Request";
  return res.json({ ...responce, signature: signature(responce) });
});

Router.get("/validity", async (req, res) => {
  const username = req.query.user;
  const code = req.query.code;
  const responce = {};

  const user = await getUser(username);
  if (!user || user.length <= 0) {
    responce["success"] = false;
    responce["error"] = { msg: "no code is send for this email", code: 6 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const DB = await Forgot.findOne({ email: user.email });
  if (DB.code === code) {
    responce["success"] = true;
    responce["msg"] = "code is valid";
    return res.json({ ...responce, signature: signature(responce) });
  }

  responce["success"] = false;
  responce["error"] = { msg: "wrong verification code", code: 7 };
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/reset", async (req, res) => {
  const username = req.body.user;
  const newPass = req.body.newPass;
  const code = req.body.code;
  const responce = {};

  const user = await getUser(username);
  if (!user || user.length <= 0) {
    responce["success"] = false;
    responce["error"] = { msg: "no code is send for this email", code: 6 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (!newPass) {
    responce["success"] = false;
    responce["error"] = { msg: "Missing field options", code: 18 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const DB = await Forgot.findOne({ email: user.email });

  if (!DB) {
    responce["success"] = false;
    responce["error"] = { msg: "no code is send for this email", code: 6 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (DB.code.toString() !== code.toString()) {
    responce["success"] = false;
    responce["error"] = { msg: "wrong verification code", code: 7 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  await Forgot.findOneAndDelete({ email: user.email });
  const salt = generateSalt();
  const pass = sha512(sha512(newPass) + salt);
  await User.findOneAndUpdate({ email: user.email }, { pass, salt });

  responce["success"] = true;
  responce["msg"] = "password changed";
  return res.json({ ...responce, signature: signature(responce) });
});

module.exports = Router;
