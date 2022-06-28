// Libraries
const fs = require("fs");
const NodeRsa = require("node-rsa");

// config
const key = new NodeRsa({b: 1024});
const pubKey = key.exportKey("public");
const prvKey = key.exportKey("private");

// save pubKey to file
fs.writeFile("pubKey.txt", pubKey, (err) => {
    if (!err) return;
    console.log(err);
} );

// save prvKey to file
fs.writeFile("prvKey.txt", prvKey, (err) => {
    if (!err) return;
    console.log(err);
} );