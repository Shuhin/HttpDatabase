var http = require ('http');
var express = require('express');
var fs = require('fs');
var mysql= require('mysql');
var app = express();
//app.use(bodyparser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todoDB'
});

connection.connect(function(error){
  if(!!error) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});


app.get('/get', function(req, res){
  console.log('request was made: '+ req.url);
    connection.query("SELECT * FROM todo" , function(error,rows, fields){
          if(!!error) {
            console.log ('Error in the query');
          } else {
            console.log('Successful query');
            console.log(rows);
            res.send(JSON.stringify(rows));
          }
        });
      });

 app.get('/post',function(req, res){
   console.log('request was made: '+ req.url);
            connection.query("INSERT INTO todo (ItemNo , Item) VALUES (1, 'Buy Flower')" , function(error,rows, fields){
               if(!!error) {
                 console.log ('Error in the query');
               } else {
                 console.log('Successful query');
                 console.log(rows);
                   res.send(JSON.stringify(rows));
               }
             });
           });

app.get('/Delete', function(req, res){
  connection.query("DELETE FROM todo WHERE Item='Buy Flower'", function(error,rows, fields){
     if(!!error) {
       console.log ('Error in the query');
     } else {
       console.log('Successful query');
       console.log(rows);
         res.send(JSON.stringify(rows));
     }
   });
 });

app.listen(3000);

console.log("Now listening to port 3000");
