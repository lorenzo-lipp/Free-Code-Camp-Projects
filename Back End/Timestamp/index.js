// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:year-:month-:day", function (req, res) {
  const month = parseInt(req.params.month)
  const time = new Date(`${months[month - 1]}, ${req.params.day}, ${req.params.year}, 00:00:00`)
  const timeUtc = time.toUTCString()
  const timeUnix = time.getTime()
  const jsonResponse = {
    "unix": timeUnix,
    "utc": timeUtc
  }
  
  if (time == "Invalid Date") {
    jsonResponse.error = "Invalid Date"
  }
  
  res.json(jsonResponse);
});

app.get("/api/:date", function (req, res) {
  let timeUnix
  let time
  
  if (isNaN(req.params.date)) {
    time = new Date(req.params.date)
    timeUnix = time.getTime()
  } else {
    time = new Date()
    timeUnix = parseInt(req.params.date)
    time.setTime(timeUnix)
  }
  
  const timeUtc = time.toUTCString()
  const jsonResponse = {
    "unix": timeUnix,
    "utc": timeUtc
  }
  
  if (time == "Invalid Date") {
    jsonResponse.error = "Invalid Date"
  }
  
  res.json(jsonResponse);
});

app.get("/api", function (req, res) {
  const time = new Date()
  const timeUtc = time.toUTCString()
  const timeUnix = time.getTime()
  const jsonResponse = {
    "unix": timeUnix,
    "utc": timeUtc
  }
  
  res.json(jsonResponse);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
