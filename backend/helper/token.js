// Libraries
const uuid = require("uuid").v4;
const sha512 = require("js-sha512");

// Custom Functions
const signature = require("../crypto/functions").signature;

// Schema
const Session = require("../schema/session");


// Generates user session token
const generateToken = async (user) => {
  const mail = sha512(user.email);
  const mailPass = sha512(user.pass + mail);
  const mailPassTime = sha512(new Date().getTime().toString() + mailPass);
  const token = sha512(mailPassTime + uuid());

  // for storing in DB
  const sessionTemplate = new Session({
    _id: user.id,
    token,
  });

  // get user session if any in DB
  const activeSession = Session.findOne({ _id: user.id });

  if (activeSession) {
    // if found then overwrite it
    await Session.deleteOne({ _id: user.id });
    return await sessionTemplate.save();
  } else {
    // save token in DB
    return await sessionTemplate.save();
  }
};

const validateToken = async (req, res, next) => {
  const token = req.query.token;
  const activeSession = await Session.findOne({ token });
  const responce = {};

  if (!activeSession) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid session token", code: 11 };
    res.json({ ...responce, signature: signature(responce) });
  }

  req.body.activeSessionId = activeSession._id;
  next();
};

// Generate Salt for password
const generateSalt = () => {
  const time = sha512(new Date().getTime().toString());
  const salt = sha512(time + uuid()).slice(0, 50);
  return salt;
};

module.exports = { generateToken, generateSalt, validateToken };
