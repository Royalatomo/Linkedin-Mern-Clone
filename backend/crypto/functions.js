// Libraries
const NodeRsa = require("node-rsa");
const fs = require("fs");
const sha512 = require("js-sha512");

// Encrypt with Private Key
const encrypt = (data) => {
  const key = fs.readFileSync("./crypto/prvKey.txt", {encoding: "utf8"});
  const prvKey = new NodeRsa(key);
  const cypherData = prvKey.encryptPrivate(data, "base64");
  return cypherData;
};

// Decrypt with Private Key
const decrypt = (data) => {
  const key = fs.readFileSync("./crypto/prvKey.txt", {encoding: "utf8"});
  const pubKey = new NodeRsa(key);
  const secretData = pubKey.decrypt(data, "utf8");
  return secretData;
};

// Sign the data with Private Key
const signature = (data) => {
  const hash = sha512(JSON.stringify(data));
  const cypher = encrypt(hash);
  return cypher;
};

module.exports = { encrypt, signature, decrypt };
