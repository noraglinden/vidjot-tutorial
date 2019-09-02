const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')

const app = express()

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
  .then(() => { console.log('MongoDB connected...') })
  .catch(err => console.log(err))

//Load Idea model
require('./models/Idea')
const Idea = mongoose.model('ideas')

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//method override middleware
app.use(methodOverride('_method'))

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())

//global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

//Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
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

// Idea Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      })
    })
})

//Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add')
})

//Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea:idea
    })
  })
})

// Process Form
app.post('/ideas', (req, res) => {
  let errors = []

  if (!req.body.title) {
    errors.push({ text: 'Please add a title' })
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details' })
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    })
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser).save().then(idea => {
      req.flash('success_msg', "Video added")
      res.redirect('/ideas')
    })
  }
})

//Edit Form
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    //new values
    idea.title = req.body.title
    idea.details = req.body.details

    idea.save().then(idea => {
      req.flash('success_msg', "Idea updated")
      res.redirect('/ideas')
    })
  })
})

//Delete Idea
app.delete('/ideas/:id', (req, res) => {
  Idea.deleteOne({
    _id: req.params.id
  })
  .then(() => {
    req.flash('success_msg', "Idea successfully deleted.")
    res.redirect('/ideas')
  })
})

const port = 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})