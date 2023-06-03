var host = 'staging-paddle.intai.me'
var timestamp = process.env.TIMESTAMP || ''

module.exports = {
  appUri: `https://${host}`,
  imagesUri: `/static-${timestamp}/images`,
  staticUri: `/static-${timestamp}`,
  timestamp,

  graphql: {
    uri: `https://${host}:4000/graphql`,
  },
}
