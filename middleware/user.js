const User = require("../models/user");

//Checks if the reset password link for users has expirired.
function hasExpired(resetHash) {
        var now = new Date();
        User.findOne({resetHash: resetHash}).then((foundUser) => {
            console.log(foundUser.username);
            console.log((now - foundUser.createDate) > 1);
            return (now - foundUser.createDate) > 1; //token is a day old
        });
}

module.exports = {hasExpired};