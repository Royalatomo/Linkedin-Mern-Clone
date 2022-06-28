const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    _id: {
        required: true,
        type: String
    },
    token: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("session", sessionSchema)