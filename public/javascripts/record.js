// get username and save in the sessionStorage
var usernameText = $('#usernameText')[0].innerHTML;
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

        //get username
        var username = sessionStorage.getItem('username')

        //put the data into an object
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

        //validated
        let valid = true;
        if (record.weight === '') valid = false;
        if (record.date === '') valid = false;
        if (record.startTime === '') valid = false;
        if (record.endTime === '') valid = false;
        if (record.distance === '') valid = false;
        if (record.speed === '') valid = false;
        if (record.calories === '') valid = false;

        
        if (valid) {
            // nothing is empty, then post
            $.ajax({
                //post 'POST' require to the server, route is /record
                type: 'POST',
                url: '/record',
                data: record,
                success: function(data) {
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
