const express = require('express')

const app = express()

// How middleware works, how authentication will work. will put user information from session into request.user, access from anywhere
app.use(function(req, res, next){
  //console.log('Time:', Date.now())
  req.name = 'Nora Harris'
  next()
})

//Index Route
app.get('/', (req, res) => {
  console.log(req.name)
  res.send('index')
})

//About Route
app.get('/about', (req, res) => {
  res.send('about')
})

const port = 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})