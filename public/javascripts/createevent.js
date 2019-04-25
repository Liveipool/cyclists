
$(document).ready(function() {
    //click add, trigger event 'add-record'
    $('#create_publish').on('click', function(event) {
        event.preventDefault();

        //take out the value of input
        var title = $('#create_title').val();
        var date = $('#create_date').val().toString();
        var time = $('#create_time').val();
        // var route = routes_data;
        var routestr = str;
        var description = $('#time').val();
        var participants = [];
        var publisher = "this user";

        var event = {
            title: title,
            date: date,
            time: time,
            // route: route,
            routestr:routestr,
            description: description,
            participants: participants,
            publisher:publisher
        }
        console.log("event: ", event);

        let valid = true;
        if (event.title === '') valid = false;
        if (event.date === '') valid = false;
        if (event.time === '') valid = false;
        if (event.description === '') valid = false;

        if (valid) {
            $.ajax({
                type: 'POST',
                url: '/event/create',
                data: event,
                success: function(data) {
                    //jump back to event page
                    alert('Add successfully!')
                    location.pathname = 'event';
                }
            });
        } else {
            alert('Please enter all infomation!')
        }
        return false;
    })
})