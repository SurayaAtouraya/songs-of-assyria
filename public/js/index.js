//Show modal to reset password
function resetPassword() {
    window.history.replaceState('', 'Songs of Assyria', 'https://songs-of-assyria-atouraya.c9users.io/');
    $('#resetPasswordPopup').modal({backdrop: 'static', keyboard: false})  
    $('#resetPasswordPopup').modal('show');
}

//User has confirmed they would like to not reset password
function cancelReset() {
    $('#confirmResetPasswordModalExit').modal('hide');
}

function invalidPassword() {
    $('#resetPassword').addClass('has-error');
    $('#newPasswordErrMsg').removeClass('hidden');
    $('#resetPasswordPopup').removeClass('fade');
    $('#resetPasswordPopup').modal('show');
    $('#resetPasswordPopup').addClass('fade');
}