var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send("Hello World")  
});

app.post("/slack-request", function(request, response) {
  console.log("Received request from Slack: ", request.params.text);
  response.send("OK");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

