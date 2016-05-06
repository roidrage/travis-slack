var express = require('express');
var bodyParser = require('body-parser');
var rqst = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response) {
  response.send("Hello World")  
});

app.post("/slack-request", function(httpRequest, httpResponse) {
  var cmdPattern = /build ([^ ]+) on ([^ ]+)/i;
  if (httpRequest.body.text) {
    var command = cmdPattern.exec(httpRequest.body.text);
    var repoName = command[1];
    var branch = command[2]; 

    rqst.post({
      url: 'https://api.travis-ci.org/repo/' + encodeURIComponent(repoName) + '/requests',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Travis-API-Version': '3',
        'Authorization': 'token ' + process.env.TRAVIS_API_TOKEN
      },
      json: true,
      body: {
        message: 'Slack-triggered build by ' + httpRequest.body.user_name,
        branch: branch,
        config: {
          language: 'node_js',
          node_js: '6.0',
          script: 'echo Hello World'
        }
      }
    }, function(error, res, body) {
      if (!error && res.statusCode == 202) {
        httpResponse.send({
          response_type: "in_channel",
          text: "Started build for " + repoName + " on branch " + branch
        });
      }
    });
  } 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

