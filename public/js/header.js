//Display error to alert user of failed login.
function loginFail() {
    window.history.replaceState('', 'Songs of Assyria', 'https://songs-of-assyria-atouraya.c9users.io/');
    $('#loginPopup').removeClass('fade');
    $('#loginPassword').addClass('has-error');
    $('#loginUsername').addClass('has-error');
    $('#loginErrMsg').removeClass('hidden');
    $('#loginPopup').modal('show');
    $('#loginPopup').addClass('fade');
}

//Returns to signup page and notifies user of what error occured
function signupFail(email, username, redBoxEmail, redBoxUsername, redBoxPassword) {
    window.history.replaceState('', 'Songs of Assyria', 'https://songs-of-assyria-atouraya.c9users.io/');
    $('#signupPopup').removeClass('fade');
    if (redBoxEmail === true) {$('#signupEmail').addClass('has-error');}
    if (redBoxUsername === true) {$('#signupUsername').addClass('has-error');}
    if (redBoxPassword === true) {$('#signupPassword').addClass('has-error');}
    $('#signupErrMsg').removeClass('hidden');
    if (email != "") {
    $('#emailBox').removeAttr('placeholder');
    $('#emailBox').attr('value', email);
    }
    if (username != "") {
    $('#usernameBox').removeAttr('placeholder');
    $('#usernameBox').attr('value', username);
    }
    $('#signupPopup').modal('show');
    $('#signupPopup').addClass('fade');
}

//Notify user that an invalid email was entered for the forgot password option
function resetFail() {
    window.history.replaceState('', 'Songs of Assyria', 'https://songs-of-assyria-atouraya.c9users.io/');
    $('#forgotPasswordPopup').removeClass('fade');
    $('#resetEmail').addClass('has-error');
    $('#resetErrMsg').removeClass('hidden');
    $('#forgotPasswordPopup').modal('show');
    $('#forgotPasswordPopup').addClass('fade');
}

//Remove error on any click since user is now aware. (Login)
$('#loginPopup').on('click', function () {
    $('#loginPassword').removeClass('has-error');
    $('#loginUsername').removeClass('has-error');
    $('#loginErrMsg').addClass('hidden');
}); 

//Remove error on any click since user is now aware. (Signup)
$('#signupPopup').on('click', function () {
    $('#signupPassword').removeClass('has-error');
    $('#signupUsername').removeClass('has-error');
    $('#signupEmail').removeClass('has-error');
    $('#signupErrMsg').addClass('hidden');
}); 

//Remove error on any click since user is now aware. (Reset)
$('#forgotPasswordPopup').on('click', function () {
    $('#resetEmail').removeClass('has-error');
    $('#resetErrMsg').addClass('hidden');
}); 






