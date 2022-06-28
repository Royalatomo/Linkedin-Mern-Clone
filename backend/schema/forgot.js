const mongoose = require("mongoose");

const forgotSchema = mongoose.Schema({
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

module.exports = mongoose.model("forgot", forgotSchema)