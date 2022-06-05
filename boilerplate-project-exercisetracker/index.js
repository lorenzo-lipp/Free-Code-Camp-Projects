const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
require('dotenv').config()
const { Schema } = mongoose

const userSchema = new Schema({
  "_id": {type: String, required: true},
  "count": {type: Number, required: true},
  "username": {type: String, required: true},
  "log": {type: Array, required: true}
})
const exerciseSchema = new Schema({
  "description": {type: String, required: true},
  "duration": {type: Number, required: true},
  "date": {type: String, required: true}
}, {
    versionKey: false
})
const User = mongoose.model('User', userSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', (req, res) => {
  User.find({})
    .then((match) => res.json(match))
    .catch((err) => res.json(err))
})

app.post('/api/users', (req, res) => {
  const uniqueId = new mongoose.Types.ObjectId();
  const data = { 
    "_id": uniqueId,
    "count": 0,
    "username": req.body.username,
    "log": []
  }
  const createUser = new User(data)
  createUser.save()
    .then((userCreated) => {
        res.json({
          "_id": userCreated["_id"],
          "username": userCreated.username
        }
    )})
    .catch((err) => res.json(err))
})

app.post('/api/users/:_id/exercises', (req, res) => {
  User.findOne({"_id": req.params["_id"]})
    .then((findUser) => {
      const fullDate = req.body.date ? req.body.date.split('-') : []
      const date = fullDate[2] ? new Date(fullDate[0], parseInt(fullDate[1]) - 1, fullDate[2]) : new Date()
      const createExercise = new Exercise({
        "description": req.body.description,
        "duration": parseInt(req.body.duration),
        "date": date.toDateString()
      })
      findUser.log.push(createExercise)
      findUser.count++
      findUser.save()
        .then(() => {
          res.json({
            "_id": findUser["_id"],
            "username": findUser.username,
            "description": createExercise["description"],
            "duration": createExercise["duration"],
            "date": createExercise["date"]
          })
        })
        .catch((err) => res.json(err))
    })
    .catch(() => res.json({ error: "Invalid id" }))
})

app.get('/api/users/:_id/logs', (req, res) => {
  User.findOne({"_id": req.params["_id"]})
    .then((findUser) => {
      const from = req.query.from || 0
      const dateFrom = new Date(from) 
      const to = req.query.to || Date.now()
      const dateTo = new Date(to)
      const limit = req.query.limit || findUser.log.length + 1
      const logs = findUser.log.filter(v => {
        const time = new Date(v.date).getTime()
        return time >= dateFrom.getTime() && time <= dateTo.getTime()
      })
      res.json({
        _id: findUser["_id"],
        count: findUser.count,
        username: findUser.username,
        log: logs.slice(0, limit)
      })
    })
    .catch((err) => res.json(err))
}) 



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
