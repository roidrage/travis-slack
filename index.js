var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response) {
  response.send("Hello World")  
});

app.post("/slack-request", function(request, response) {
  console.log("Received request from Slack: ", request.body.text);
  response.send("OK");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

