$(document).ready(function() {
    //click add, trigger event 'add-record'
    $('#register').on('click', function(event) {
        location.pathname = 'users/register';
    })
})