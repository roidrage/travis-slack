var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response) {
  response.send("Hello World")  
});

app.post("/slack-request", function(request, response) {
  var cmdPattern = /build ([^ ]+) on branch ([^ ]+)/i;
  if (request.body.text) {
    var command = cmdPattern.exec(request.body.text);
    var repoName = command[1];
    var branch = command[2]; 
    response.send("You asked me to build ", repoName, " on branch ", branch);
  } 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

