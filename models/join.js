// var Event = require('./event');
// var User = require('./user');

// router.put('/join/:id') {
//     var eventid = req.params.id;
//     var username = req.user.usernam
//     User.findOne(username, function(err, user) {
//         if (err) throw err;
//         Event.find({_id: eventid}, , function(err, data) {
//             if (err) throw err;
//             console.log(data);
//             event = data[0];
//             //check is joinging own event
//             if (event.publisher === username)
//                 return {error: "Cannot join if admin"};
//             //check if has already joined
//             async.forEach(user.events, function(obj, next) {
//                 if (obj.toString() === id.toString())
//                     return {error: "Already joined event"};
//                 next();
//             }, function() {
//                 event.participants.push(username);
//                 event.save(function(err) {
//                     if (err) throw err;
//                     user.myevents.push(eventid);
//                     user.save(function(error) {
//                         if (err) throw err;
//                         return {success: "Joined event " + event.name};
//                     })
//                 })
//             })
//         })
//     })
// }
