var host = 'localhost'

module.exports = {
  appUri: `http://${host}`,
  imagesUri: '/static/images',
  staticUri: '/static',
  timestamp: '',

  auth: {
    clientId: '',
    clientSecret: '',
  },
  graphql: {
    uri: `http://${host}:4000/graphql`,
  },
}
