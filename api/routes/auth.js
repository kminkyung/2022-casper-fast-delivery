const { Router } = require('express');
const qs = require('qs');
const axios = require('axios');
const config = require('../../config');

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.get('/',  (req, res) => {
    console.log('>>>>>>>>');
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.clientID}&redirect_uri=${config.kakao.redirectURI}&response_type=code`;
    return res.redirect(kakaoAuthURL);
  });

  route.get('/kakao', async (req, res) => {
    let token = '';
    let user;

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
      return res.json(err.data);
    }

    try {
      user = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${token.data.access_token}`
        }
      })
    } catch (e) {
      return res.json(e.data);
    }

    req.session.kakao = {
      token: token.data.access_token,
      ...user.data
    };

    return res.redirect('/');
  })
}
