require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const shortUrls = []

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  console.log(req.body.url)
  const short = shortUrls.length + 1
  const url = req.body.url
  const checkURL = url.match(/https?:\/\/[a-zA-Z0-9-_]*\..*/)
  const jsonResponse = { "original_url": url, "short_url": short }
  if (url && checkURL) {
    shortUrls.push(jsonResponse)
    res.json(jsonResponse)
  } else {
    res.json({ "error": 'invalid url' })
  }
})

app.get('/api/shorturl/:num', (req, res) => {
  console.log(req.params.num)
  const url = shortUrls.find(v => v["short_url"] == req.params.num)
  if (url) {
    res.redirect(url["original_url"])
  } else {
    res.json({ "error": 'invalid url' })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
