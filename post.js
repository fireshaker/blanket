var http = require('http');
var querystring = require('querystring');


function post(url, body) {
  var postData = querystring.stringify({
    msg: 'hello world'
  });

  var options = {
    hostname: url,
    port: 3000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      console.log('BODY:', chunk);
    });

    res.on('end', function () {
      console.log('No more data in response.');
    });
  });

  req.on('error', function (e) {
    console.log('Problem with request:', e.message);
  });

  req.write(postData);
  req.end();
}