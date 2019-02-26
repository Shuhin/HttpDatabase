let express = require('express');

let mysql = require('mysql');

let app = express();

let errorhandler = require('errorhandler');

let QueryError = false;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DB'
});

function errorNotification (err, str, req) {
  let title = 'Error in in the query '

  notifier.notify({
    title: title,
    message: str
  })
}

app.use(function check(req, res, next){

  connection.connect(function(error) {
    if (error) {
      res.writeHead(500, {'content-Type': 'text/plain'});
      res.end('500 Server Error, Something went wrong with the connection');
      console.log('Connection problem ');
    } else {
      console.log("Database Connection OK")

      if(QueryError){
        console.log('Error in the query');
        res.writeHead(400, {
          'content-Type': 'text/plain'
        });
        res.end('400 Bad Request, Please check your query again');
      }
    }
  });
    next();
});

app.get('/', function(req, res) {
      console.log('request was made: ' + req.url);
      connection.query("SELECT * FROM DB", function(error, rows) {
        if (error){
              QueryError =true;
              return;
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
          app.use(errorhandler({log: errorNotification}))
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
       if (error){
             app.use(errorhandler({log: errorNotification}))
       } else {
         console.log('Successful query');
         console.log(rows);
         res.end(JSON.stringify(rows) + "\n" + 'Successfully Deleted');
       }
     });
   });


app.listen(3000);
console.log("Now listening to port 3000");
