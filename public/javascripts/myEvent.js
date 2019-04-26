$(document).ready(function() {
    $.ajax({
        //post 'POST' require to the server, route is /record
        type: 'POST',
        url: '/myEvent',
        data: events,
        success: function(data) {
        //     $('#calendar').fullCalendar({
        //         defaultView: 'month',
        //         height: 'auto',
        //         header: false,
        //         displayEventTime:true,
        //         displayEventEnd:true,
        //         weekMode:"liquid",
        //         aspectRatio:2,
        //         timeFormat: 'HH:mm',
        //     })

        // function drawCalendar(data) {
        //     $('#calendar').fullCalendar( 'removeEvents');
        //     //传入的数据
        //     var events=[];
        //         for(var i=0, len=data.length; i<len; i++){
        //             var timeDate=data[i];
        //             var item={
        //                 title : timeDate["title"],
        //                 start : timeDate["date"].replace(" ","T"),
        //                 className : "event-bar",
        //             backgroundColor : getCalendarColor(timeDate["user"]),
        //         };
        //         events.push(item);
        //     }
        //         $('#calendar').fullCalendar( 'addEventSource', events );
        //     }
            
            }
         });
    
})
