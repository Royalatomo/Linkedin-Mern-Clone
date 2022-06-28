const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema({
    uname: {
        required: true,
        type: String
    },
    pass: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("verification", verificationSchema)