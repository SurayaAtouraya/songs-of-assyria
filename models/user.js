const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');

function toLower (str) {
    return str.toLowerCase();
}

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, set: toLower, unique: true}, 
    password: String,
    verified: {
        type: Boolean,
        default: false
    },
    verifyHash: String,
    resetHash: {type: String, unique: true},
    createDate: {type: Date, default: Date.now},
    googleID: String,
    facebookID: String,
    instagramID: String
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);