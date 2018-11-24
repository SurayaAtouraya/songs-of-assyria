const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

function toLower (str) {
    return str.toLowerCase();
}

var UserSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String, set: toLower, unique: true}, 
    verified: {
        type: Boolean,
        default: false
    },
    verifyHash: String,
    googleID: String,
    facebookID: String,
    instagramID: String
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("preUser", UserSchema);