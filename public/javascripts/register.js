$(document).ready(function() {
    $('#register').click(function() {
        window.location.pathname = '/record';
        alert('注册成功并自动登录');
    })

    $('#back').click(function() {
        window.location.pathname = '/';
    })
})