const crypto = require('crypto');

//Generates a random hash to be used in verification processes.
module.exports = {
    emailHash: function(){
        return crypto.randomBytes(128).toString('hex');
    }
}