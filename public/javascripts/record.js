// 取到username并存到浏览器的sessionStorage中
const usernameText = $('#usernameText')[0].innerHTML;
sessionStorage.setItem('username', usernameText);

$(document).ready(function() {
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

        // 取到username
        const username = sessionStorage.getItem('username')

        var record = {
            username: username,
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

        let valid = true;
        if (record.weight === '') valid = false;
        if (record.date === '') valid = false;
        if (record.startTime === '') valid = false;
        if (record.endTime === '') valid = false;

        if (valid) {
            // 说明所有基本信息都不为空，可以post
            $.ajax({
                //post 'POST' require to the server, route is /record
                type: 'POST',
                url: '/record',
                data: record,
                success: function(data) {
                    // 按理说应该是只更新右边的数据、清空左边的表格而不是刷新整个页面，后面有空再优化
                    document.getElementById('distance').innerHTML ="";
                    alert('Add successfully!')
                    location.reload();
                }
            });
        } else {
            alert('Please enter all infomation!')
        }
        return false;
    })
})
