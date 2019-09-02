if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://nora:<password>@vidjot-prod-shard-00-00-qotco.mongodb.net:27017,vidjot-prod-shard-00-01-qotco.mongodb.net:27017,vidjot-prod-shard-00-02-qotco.mongodb.net:27017/test?ssl=true&replicaSet=vidjot-prod-shard-0&authSource=admin&retryWrites=true&w=majority'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}