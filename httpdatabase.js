let http = require('http');
let mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DB'
});


let server = http.createServer(function(req, res) {

  connection.connect(function(error) {
    if (error) {
      res.writeHead(500, { 'content-Type': 'text/plain'});
      res.end('500 Server Error, Something went wrong with the connection');
      server.close();
    } else {
          console.log('Connected');
      };
  });

  if (req.url === '/get' || req.url === "/") {
    console.log('request was made: ' + req.url);
    connection.query("SELECT * FROM DB", function(error, rows) {
      if (error) {
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

  } else if (req.url === "/post") {
    console.log('request was made: ' + req.url);
    connection.query("INSERT INTO `DB`(`Item No`, `Item`) VALUES (2 , 'Buy chocolate')", function(error, rows) {
      if (error) {
        console.log('Error in the query');
        res.writeHead(400, { 'content-Type': 'text/plain'});
        res.end('400 Bad Request, Please check your query again');
        server.close();
      } else {
        res.writeHead(200, {'content-type': 'application/json'});
        console.log('Successful query');
        console.log(rows);
        res.end(JSON.stringify(rows));
      }
    });

  } else if (req.url === "/delete") {
    connection.query("DELETE FROM DB WHERE Item ='Buy chocolate'", function(error, rows) {
      if (error) {
      console.log('Error in the query');
      res.writeHead(400, { 'content-Type': 'text/plain'});
      res.end('400 Bad Request, Please check your query again');

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
