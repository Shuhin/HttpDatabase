var http = require('http');
//var express = require('express');
//var fs = require('fs');
var mysql = require('mysql');
//var app = express();
//app.use(bodyparser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todoDB'
});

connection.connect(function(error) {
  if (!!error) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

var server = http.createServer(function(req, res) {
  if (req.url === '/get' || req.url === "/") {
    console.log('request was made: ' + req.url);
    connection.query("SELECT * FROM todo", function(error, rows, fields) {
      if (!!error) {
        console.log('Error in the query');
      } else {
        console.log('Successful query');
        console.log(rows);
        res.end(JSON.stringify(rows));
      }
    });
  } else if (req.url === "/post") {
    console.log('request was made: ' + req.url);
    connection.query("INSERT INTO todo (ItemNo , Item) VALUES (1, 'Buy Flower')", function(error, rows, fields) {
      if (!!error) {
        console.log('Error in the query');
      } else {
        console.log('Successful query');
        console.log(rows);
        res.end(JSON.stringify(rows));
      }
    });
  } else if (req.url === "/delete") {
    connection.query("DELETE FROM todo WHERE Item='Buy Flower'", function(error, rows, fields) {
      if (!!error) {
        console.log('Error in the query');
      } else {
        console.log('Successful query');
        console.log(rows);
        res.end(JSON.stringify(rows));
      }
    });
  }
});

server.listen(3000);

console.log("Now listening to port 3000");
