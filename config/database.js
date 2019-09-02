if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://nora:nora@vidjot-prod-qotco.mongodb.net/test?retryWrites=true&w=majority'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}