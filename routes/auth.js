const express = require('express');
const router = express.Router();
const qs = require('qs');
const axios = require('axios');
const config = require('/config');

router.get('/', function(req, res, next) {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.clientID}&redirect_uri=${config.kakao.redirectURI}&response_type=code&scope=profile,account_email`;
  res.redirect(kakaoAuthURL);
});

app.get('/kakao', async (req, res) => {
  let token = '';
  try {
    token = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: config.kakao.clientID,
        client_secret: config.kakao.clientSecret,
        redirectUri: config.kakao.redirectURI,
        code: req.query.code,
      })
    })
  } catch (err) {
    res.json(err.data);
  }
  console.log('token', token);

  let user;
  try {
    user = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${token.data.access_token}`
      }
    })
  } catch (e) {
    res.json(e.data);
  }
  console.log(user);

  req.session.kakao = user.data;

  res.send('success');
})

module.exports = router;
