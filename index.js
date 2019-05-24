const express = require('express')
const apiRoutes = require('./apiRoutes')
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.use('/api', apiRoutes)

app.listen(port, () => console.log(`app listening on port ${port}!`))
