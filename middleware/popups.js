var popups = require('popups');

module.exports = {
    askUser: function(temp) {
        popups.prompt({
            content:     'Create a Username!',
            placeholder: temp,
            onSubmit: function(val) {
                if(val) {
                    popups.alert({
                    content: 'Hello, ' + val
                    });
                }
            }
        });
    }
};