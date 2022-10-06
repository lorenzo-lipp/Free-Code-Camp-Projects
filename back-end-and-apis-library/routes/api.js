'use strict'

const mongoose = require('mongoose');
const mongodb = require('mongodb');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const { Schema } = mongoose;
const ObjectID = mongodb.ObjectID;
const bookSchema = new Schema({
  "_id": { type: String, required: true },
  "title": { type: String, required: true },
  "image": { type: String, required: true },
  "comments": [{ type: String }],
  "commentcount": { type: Number, required: true }
}, {
  versionKey: false
});
const Book = mongoose.model('Book2', bookSchema);
require('dotenv').config();

module.exports = function (app) {

  app.route('/')
    .get((req, res) => res.end());

  app.route('/new-book')
    .get((req, res) => res.end());

  app.route('/api/books')
    .get((req, res) => {
      Book.find({}, (err, docs) => {
        if (err) return res.json(err);
        if (docs.length === 0) return res.send('no book exists')
        res.json(docs);
      });
    })

    .post((req, res) => {
      let title = req.body.title;
      let image = req.body.image;
      if (!title) return res.send('missing required field title');
      if (!image) return res.send('missing required field image');
      let id = new ObjectID();
      const doc = new Book({
        "_id": id,
        "title": title,
        "image": image,
        "commentcount": 0
      });
      doc.save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    })

    .delete((req, res) => {
      Book.deleteMany({}, (err, result) => {
        if (err) return res.json(err);
        res.send('complete delete successful');
      })
    });



  app.route('/api/books/:id')
    .get((req, res) => {
      let bookid = req.params.id;
      Book.findOne({
        "_id": bookid
      }, (err, doc) => {
        if (err || doc === null) return res.send('no book exists');
        return res.json(doc);
      });
    })

    .post((req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send('missing required field comment');
      Book.findOne({
        "_id": bookid
      }, (err, doc) => {
        if (err || doc === null) return res.send('no book exists');
        if (!doc.comments) doc.comments = [];
        doc.comments.unshift(comment);
        doc.commentcount++;
        doc.save()
          .then(() => res.json(doc))
          .catch((err) => res.json(err));
      });
    })

    .delete((req, res) => {
      let bookid = req.params.id;
      Book.findOneAndDelete({
        "_id": bookid
      }, (err, doc) => {
        if (err || doc === null) return res.send('no book exists');
        return res.send('delete successful');
      });
    });

};
