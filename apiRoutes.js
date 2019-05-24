const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const router = express.Router()
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [], user: {}, count: 0 }).write()

router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId
  const user = db.get(`user.${userId}`).value()

  if (user) {
    return res.json({
      ...user
    })
  }
  res.json({
    error: 'no data'
  })
})

router.post('/user', (req, res) => {
  const user = req.body

  const isExist = db.has(`user.${user.id}`).value()
  if (isExist) {
    return res.json({
      error: 'user duplicate'
    })
  }

  db.set(`user.${user.id}`, user).write()

  res.json({
    success: true,
    data: user
  })
})

module.exports = router
