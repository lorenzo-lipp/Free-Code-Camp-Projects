const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const crypto = require("crypto")
require('dotenv').config()
const users = []

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const uniqueId = crypto.randomBytes(9).toString("hex")
  data = { 
    "_id": uniqueId,
    "count": 0,
    "username": req.body.username,
    "log": []
  }
  users.push(data)
  res.json({
    "_id": data["_id"],
    "username": data.username
  })
})

app.post('/api/users/:_id/exercises', (req, res) => {
  const user = users.find(v => v["_id"] == req.params["_id"])
  const fullDate = req.body.date ? req.body.date.split('-') : []
  const date = fullDate[2] ? new Date(fullDate[0], parseInt(fullDate[1]) - 1, fullDate[2]) : new Date()
  if (req.body.description != undefined && !isNaN(req.body.duration)) {
    if (user) {
      user.log.push({
        description: req.body.description,
        duration: parseInt(req.body.duration),
        date: date.toDateString()
      })
      user.count++
      res.json({
        _id: user["_id"],
        username: user.username,
        description: req.body.description,
        duration: parseInt(req.body.duration),
        date: date.toDateString()
      })
    } else {
      res.json({ error: "Invalid id" })
    }
  } else {
    res.json({ error: "Missing properties"})
  }
})

app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.find(v => v["_id"] == req.params["_id"])
  const from = req.query.from || 0
  const dateFrom = new Date(from) 
  const to = req.query.to || Date.now()
  const dateTo = new Date(to)
  
  if (user) {
    const limit = req.query.limit || user.log.length + 1
    const logs = user.log.filter(v => {
      const time = new Date(v.date).getTime()
      return time >= dateFrom.getTime() && time <= dateTo.getTime()
    })
    res.json({
      _id: user["_id"],
      count: user.count,
      username: user.username,
      log: logs.slice(0, limit)
    })
  } else {
    res.json({ error: "Invalid id" })
  }
}) 



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
