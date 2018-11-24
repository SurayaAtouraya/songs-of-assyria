module.exports = {
    
    //Checks if a password is valid (at least 4 characters long)
    validatePassword: function(password) {
        if (password.length < 4 || password.length > 100) {return false;}        //Between 4 and 100 characters
        return true;
    },
    
    //Checks if the string is a valid email
    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email));
    },
    
    //Checks if the string is a valid username (alphanumeric characters and underscores only)
    validateUsername: function(username) {
        return /^[a-z0-9_]+$/i.test(username);
    },
    
    //Converts a string to alphanumeric by removing non alphanumeric characters and converts white space to underscores.
    toAlphaNumeric: function(string) {
        string = string.toLowerCase();
        string = string.replace(/ /g,"_");
        string = string.replace(/\W/g, '');
        return string;
    }
};