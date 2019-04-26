$(document).ready(function() {
    // get username
    // sessionStorage.getItem('username')
    $('#calendar').fullCalendar({
        defaultView: 'month',
        height: 'auto',
        header: false,
        displayEventTime:true,
        displayEventEnd:true,
        weekMode:"liquid",
        aspectRatio:2,
        timeFormat: 'HH:mm',
    })
    // $('#example').click(function() {
    //     location.pathname = 'friend';
    // })

    function drawCalendar(data) {
        $('#calendar').fullCalendar( 'removeEvents');
        //传入的数据
        var events=[];
        for(var i=0, len=data.length; i<len; i++){
            var timeDate=data[i];
            var item={
                title : timeDate["title"],
                start : timeDate["start"].replace(" ","T"),
                className : "event-bar",
                backgroundColor : getCalendarColor(timeDate["user"]),
            };
            events.push(item);
        }
        $('#calendar').fullCalendar( 'addEventSource', events );
    }
})
