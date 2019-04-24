$(document).ready(function() {
    //click add, trigger event 'add-record'
    $('#add_record').on('click', function(event) {
        event.preventDefault();

        //take out the value of input
        var date = $('#date').val().toString();
        console.log(date);
        
        var time = $('#time').text();
        var distance = $('#total').text();
        var speed = $('#speed').text();
        var calories = $('#kcal').text();

        var record = {
            date: date,
            time: time,
            distance: distance,
            speed: speed,
            calories: calories
        }
        console.log(record);

        $.ajax({
            //post 'POST' require to the server, route is /record
            type: 'POST',
            url: '/record',
            data: record,
            success: function(data) {
                //do something with the data via front-end
                
                //if success, reload the page
                location.reload();
            }
        });
        return false;
    })
})