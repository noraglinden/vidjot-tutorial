const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../utils/auth')

//Index Route
router.get('/', ensureAuthenticated, (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title: title
  })
})

//About Route
router.get('/about', (req, res) => {
  res.render('about')
})

module.exports = router