const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
.then(() => {console.log('MongoDB connected...')})
.catch(err => console.log(err))

//Load Idea model
require('./models/Idea')
const Idea = mongoose.model('ideas')

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//Body-Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Index Route
app.get('/', (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title: title
  })
})

//About Route
app.get('/about', (req, res) => {
  res.render('about')
})

//Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add')
})

// Process Form
app.post('/ideas', (req, res) => {
  res.send('ok')
})

const port = 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})