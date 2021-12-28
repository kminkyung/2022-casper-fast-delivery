const dotenv = require('dotenv');
const path = require('path');

const env = dotenv.config({ path: path.join(__dirname, './.env') });
if (env.error) {
  throw env.error;
}

module.exports = {
  port: process.env.PORT,

  kakao: {
    clientID: process.env.KAKAO_REST_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectURI: process.env.KAKAO_REDIRECT_URI
  }
}