let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let app = express();

MongoClient.connect('mongodb://localhost:27017/Student', (err, client) => {
  if (err) {
    return console.log('Unable to Connect');
  } else {
    const db = client.db('Student')
    console.log('Connected and Collection Created');
    db.collection('Profile').insertOne({
      Name: 'Shuhin',
      ID: 0427,
      Position: 'Intern'
    }, (err, result) => {
      if (err) return console.log('Unable', err);
     console.log(JSON.stringify(result.ops, undefined, 2));
     console.log ('Profile Created');
    });
  }
});
//
// });// connecting database
//
// // creating a blueprint how the database will expect data
//
//   var doSchema = new mongoose.Schema({
//        ItemNo : 0,
//        Item : String
//     });
// //
//    var do = mongoose.model('do', doSchema);
//
//    var itemOne = do({Item : 'Get Flowers'}).save(function(err){
//    if (err) throw err;
//    console.log ('item saved');
//   });

//
// module.exports = function(app) {
//
//     app.get('/get', function(req, res) {
//        do.find({}, function(err,data){

//         if(err) throw err;
//         res.end(JSON.stringify(data));
//       });
//     });
//   }

//
//     app.post('/post', urlencodedParser, function(req, res) {
//
//       var newTodo= Todo(req.body).save(function(err,data){
//         if(err) throw err;
//         res.json(data);
//       });
//     });
//
//
//     app.delete('/delete/:item', function(req, res) {
//       Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data) {
//         if (err) throw err;
//         res.json(data);
//       });
//     });
// }
