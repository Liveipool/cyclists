$(document).ready(function() {
    $('#register').click(function() {
        window.location.pathname = '/index';
        alert('注册成功并自动登录');
    })

    $('#back').click(function() {
        window.location.pathname = '/';
    })
})