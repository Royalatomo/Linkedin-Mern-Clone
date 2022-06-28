// Libraries
const express = require("express");
const sha512 = require("js-sha512");
const { validate } = require("email-validator");

// Custom Functions
const { signature } = require("../crypto/functions");
const { getUser } = require("../helper/search");
const { generateToken } = require("../helper/token");

const Router = express.Router();

// ROUTE: /
Router.get("/", async (req, res) => {
  // Body Fields
  const username = req.query.user;
  const password = req.query.pass;
  const responce = {};

  // if username is not email
  if (!validate(username)) {
    // if special chars in username other than _
    for (let i of username) {
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
  }

  // Getting user with email/name
  const user = await getUser(username);

  // if no user found
  if (!user || user.length <= 0) {
    responce["success"] = false;
    responce["error"] = { msg: "Username/Email not found", code: 2 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const makeHash = sha512(sha512(password) + user.salt);
  const storedHash = user.pass;

  // Checking password hashes
  if (makeHash === storedHash) {
    const token = (await generateToken(user)).token;
    responce["success"] = true;
    responce["userId"] = user.id;
    responce["token"] = token;
    return res.json({ ...responce, signature: signature(responce) });
  }

  // if hashes does not match
  responce["success"] = false;
  responce["error"] = { msg: "Password Is Incorrect", code: 3 };
  return res.json({ ...responce, signature: signature(responce) });
});

module.exports = Router;
