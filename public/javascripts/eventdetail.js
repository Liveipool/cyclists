var route=$("#event_detail_route").html();
totalRoute=JSON.parse(route);
console.log(totalRoute);

var map2, render, ser;
var data = {};

function initMap() {
    map2 = new google.maps.Map(document.getElementById('map'), { 'zoom': 12, 'mapTypeId': google.maps.MapTypeId.ROADMAP, 'center': new google.maps.LatLng(26.05678288577881, -80.30236816615798) })

    render = new google.maps.DirectionsRenderer({ 'draggable': true });
    render.setMap(map2);
    ser = new google.maps.DirectionsService();
    setroute(totalRoute);
}
// goma();
function setroute(totalRoute) {
    var wp = [];
    for (var i = 0; i < totalRoute.waypoints.length; i++)
        wp[i] = { 'location': new google.maps.LatLng(totalRoute.waypoints[i][0], totalRoute.waypoints[i][1]), 'stopover': false }

    ser.route({
        'origin': new google.maps.LatLng(totalRoute.start.lat, totalRoute.start.lng),
        'destination': new google.maps.LatLng(totalRoute.end.lat, totalRoute.end.lng),
        'waypoints': wp,
        'travelMode': google.maps.DirectionsTravelMode.DRIVING
    }, function (res, sts) {
        if (sts == 'OK') render.setDirections(res);
    })
}
// $(document).ready(function () {

//     //click add event, trigger event 'add-event'
//     $('#create_publish').on('click', function (event) {
//         event.preventDefault();

//         //take out the value of input
//         var totalRoute = routes_data;
//         // var totalRoute=getElementByIdz;
//         console.log(totalRoute);

//         // function goma() {
//         //     map2 = new google.maps.Map(document.getElementById('mappy'), { 'zoom': 12, 'mapTypeId': google.maps.MapTypeId.ROADMAP, 'center': new google.maps.LatLng(26.05678288577881, -80.30236816615798) })

//         //     render = new google.maps.DirectionsRenderer({ 'draggable': true });
//         //     render.setMap(map2);
//         //     ser = new google.maps.DirectionsService();
//         //     setroute(totalRoute);
//         // }
//         // goma();




//         console.log(totalRoute);
//         // console.log("event: ", event);

//         $.ajax({
//             //post 'POST' require to the server, route is /event
//             type: 'POST',
//             url: '/event/detail/:id',
//             data: totalRoute,
//             success: function (data) {
//                 location.reload();
//                 function goma() {
//                     map2 = new google.maps.Map(document.getElementById('mappy'), { 'zoom': 12, 'mapTypeId': google.maps.MapTypeId.ROADMAP, 'center': new google.maps.LatLng(26.05678288577881, -80.30236816615798) })
        
//                     render = new google.maps.DirectionsRenderer({ 'draggable': true });
//                     render.setMap(map2);
//                     ser = new google.maps.DirectionsService();
//                     setroute(totalRoute);
//                 }
//                 // goma(totalRoute);
//                 // goma();
//             }
//         });
//         // $.ajax({
//         //     //post 'POST' require to the server, route is /event
//         //     type: 'POST',
//         //     url: '/event/detail',
//         //     data: totalRoute,
//         //     success: function (data) {
//         //         // 按理说应该是只更新右边的数据、清空左边的表格而不是刷新整个页面，后面有空再优化
//         //         // document.getElementById('distance').innerHTML ="";
//         //         location.reload();
//         //         // goma(totalRoute);
//         //         goma();
//         //     }
//         // });
//         return false;
//     })
// })
// // $(function () {
// //     $('#create_publish').click(function () {
// //         $.ajax({
// //             type: "GET",
// //             url: "test.json",
// //             data: { start: $("#start").val(), end: $("#end").val() },
// //             dataType: "json",
// //             success: function (data) {
// //                 //  $('#resText').empty();   //清空resText里面的所有内容
// //                 //  var html = '';
// //                 //  $.each(data, function(commentIndex, comment){
// //                 //        html += '<div class="comment"><h6>' + comment['username']
// //                 //                  + ':</h6><p class="para"' + comment['content']
// //                 //                  + '</p></div>';
// //                 //  });
// //                 //  $('#resText').html(html);
// //                 var totalRoute = data;
// //                 console.log(totalRoute);
// //                 function goma() {
// //                     map2 = new google.maps.Map(document.getElementById('mappy'), { 'zoom': 12, 'mapTypeId': google.maps.MapTypeId.ROADMAP, 'center': new google.maps.LatLng(26.05678288577881, -80.30236816615798) })

// //                     render = new google.maps.DirectionsRenderer({ 'draggable': true });
// //                     render.setMap(map2);
// //                     ser = new google.maps.DirectionsService();
// //                     setroute(totalRoute);
// //                 }
// //                 goma();
// //                 var map2, render, ser;
// //                 var data = {};
// //                 function setroute(os) {
// //                     var wp = [];
// //                     for (var i = 0; i < os.waypoints.length; i++)
// //                         wp[i] = { 'location': new google.maps.LatLng(os.waypoints[i][0], os.waypoints[i][1]), 'stopover': false }

// //                     ser.route({
// //                         'origin': new google.maps.LatLng(os.start.lat, os.start.lng),
// //                         'destination': new google.maps.LatLng(os.end.lat, os.end.lng),
// //                         'waypoints': wp,
// //                         'travelMode': google.maps.DirectionsTravelMode.DRIVING
// //                     }, function (res, sts) {
// //                         if (sts == 'OK') render.setDirections(res);
// //                     })
// //                 }
// //             }
// //         });
// //     });
// // });