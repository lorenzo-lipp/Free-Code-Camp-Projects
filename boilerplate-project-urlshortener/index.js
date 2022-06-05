require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const { Schema } = mongoose
const URLSchema = new Schema({
  "original_url": {type: String, required: true},
  "short_url": {type: Number, required: true}
})
const URL = mongoose.model('URL', URLSchema)

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
  URL.countDocuments({})
    .then((count) => {
      const short = count + 1
      const url = req.body.url
      const checkURL = url.match(/https?:\/\/[a-zA-Z0-9-_]*\..*/)
      const jsonResponse = { "original_url": url, "short_url": short }
      if (url && checkURL) {
        const shortUrl = new URL(jsonResponse)
        shortUrl.save()
          .then(() => res.json(jsonResponse))
          .catch((err) => res.json(err))
      } else {
        res.json({ "error": 'invalid url' })
      }
    })
    .catch((err) => res.json(err))
})

app.get('/api/shorturl/:num', (req, res) => {
  console.log(req.params.num)
  console.log(URL.findOne({"short_url": req.params.num}))
  URL.findOne({"short_url": req.params.num})
    .then((url) => res.redirect(url["original_url"]))
    .catch((err) => res.json(err))
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
