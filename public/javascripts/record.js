// 取到username并存到浏览器的sessionStorage中
const username = $('#usernameText')[0].innerHTML;
sessionStorage.setItem('username', username);

$(document).ready(function() {
    // 取到username
    // sessionStorage.getItem('username')

    //click add, trigger event 'add-record'
    $('#add_record').on('click', function(event) {
        event.preventDefault();

        //take out the value of input
        var weight = $('#weight').val();
        var date = $('#date').val().toString();
        var startTime = $('#start-time').val();
        var endTime = $('#end-time').val();
        var time = $('#time').text();
        var distance = $('#distance').text();
        var speed = $('#speed').text();
        var calories = $('#calories').text();

        var record = {
            weight: weight,
            date: date,
            startTime: startTime,
            endTime: endTime,
            time: time,
            distance: distance,
            speed: speed,
            calories: calories
        }
        console.log("record: ", record);

        $.ajax({
            //post 'POST' require to the server, route is /record
            type: 'POST',
            url: '/record',
            data: record,
            success: function(data) {
                // 按理说应该是只更新右边的数据、清空左边的表格而不是刷新整个页面，后面有空再优化
                document.getElementById('distance').innerHTML ="";
                location.reload();
            }
        });
        return false;
    })
})
