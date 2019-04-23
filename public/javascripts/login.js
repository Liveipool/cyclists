$(document).ready(function() {
    $('#register').click(function() {
        window.location.pathname = '/register';
    })

    $('#login').click(function() {
        // TODOS: 增加username和password的判断
        window.location.pathname = '/record';
        alert('登录成功');
    })
})