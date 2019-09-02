const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

// Load User Model
require('../models/User')
const User = mongoose.model('users')

//User Login Route
router.get('/login', (req, res) => {
  res.render('users/login')
})

//User Register Route
router.get('/register', (req, res) => {
  res.render('users/register')
})

//Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})

//Register Form POST
router.post('/register', (req, res) => {
  var requestName = req.body.name
  var requestEmail = req.body.email
  var requestPassword = req.body.password
  var requestPasswordValid = req.body.confirmedPassword

  let errors = []

  if (requestPassword != requestPasswordValid) {
    errors.push({ text: 'Passwords do not match.' })
  }

  if (requestPassword.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters.' })
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: requestName,
      email: requestEmail,
      password: requestPassword,
      confirmedPassword: requestPasswordValid
    })
  } else {
    User.findOne({ email: requestEmail })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'Email already registered.')
          res.redirect('/users/register')
        }
        else {
          bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(requestPassword, salt, (err, hash) => {
              if (err) throw err
              const newUser = new User({
                name: requestName,
                email: requestEmail,
                password: hash
              })
              newUser.save()
                .then(user => {
                  req.flash('success_msg', "You are now registerd and can log in")
                  res.redirect('/users/login')
                })
                .catch(err => {
                  console.log(err)
                  return;
                })
            })
          })
        }
      })
      .catch(err => {
        console.log(err)
        return;
      })
  }
})

module.exports = router