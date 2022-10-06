'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const app = express();
const apiRoutes = require('./routes/api.js');

require('dotenv').config();

app.use(['/', '/new-book'], express.static(process.cwd() + '/library-interface/build'));
app.use('/review-book/:id', express.static(process.cwd() + '/library-interface/build'));
app.use('/book/:id', express.static(process.cwd() + '/library-interface/build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apiRoutes(app);  
    
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
