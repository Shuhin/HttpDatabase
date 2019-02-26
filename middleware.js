let express = require('express');

let mysql = require('mysql');

let app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DB'
});

app.use(function check(req,res){
  connection.connect(function(error) {
    if (error) {
      res.writeHead(500, {'content-Type': 'text/plain'});
      res.end('500 Server Error, Something went wrong with the connection');
      console.log('Due to Connection problem server is forcibly closed');
    } else {
      console.log("Database Connection OK")
    }
  });
});


app.get('/', function(req, res) {
      console.log('request was made: ' + req.url);
      connection.query("SELECT * FROM DB", function(error, rows) {
        if (error){
              console.log('Error in the query');
              res.writeHead(400, {'content-Type': 'text/plain'});
              res.end('400 Bad Request, Please check your query again');
        } else {
          res.writeHead(200, {'content-type': 'application/json'});
          console.log('Successful query');
          console.log(rows);
          res.end(JSON.stringify(rows));
        }
      });
    });

app.get('/post', function(req, res) {
  console.log('request was made: ' + req.url);
  connection.query("INSERT INTO `DB`(`Item No`, `Item`) VALUES (2 , 'Buy chocolate')", function(error, rows) {
  if (error){
          console.log('Error in the query');
          res.writeHead(400, {'content-Type': 'text/plain'});
          res.end('400 Bad Request, Please check your query again');
    } else {
      res.writeHead(200, {
        'content-type': 'application/json',
        'content-Type': 'text/plain'
      });
      console.log('Successful query');
      console.log(rows);
      res.end(JSON.stringify(rows) + "\n" + 'Successfully inserted');
    }
  });
  });


app.get('/delete', function(req, res) {
     connection.query("DELETE FROM DB WHERE Item ='Buy chocolate'", function(error, rows) {
       if (error) {
             console.log('Error in the query');
             res.writeHead(400, {
               'content-Type': 'text/plain'
             });
             res.end('400 Bad Request, Please check your query again');
       } else {
         console.log('Successful query');
         console.log(rows);
         res.end(JSON.stringify(rows) + "\n" + 'Successfully Deleted');
       }
     });
   });


app.listen(3000);
console.log("Now listening to port 3000");
