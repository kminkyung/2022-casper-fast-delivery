const { Router } = require('express');
const axios = require('axios');
const config = require('../../config');

const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/logout', async (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/logout?client_id=${config.kakao.clientID}&logout_redirect_uri=${config.kakao.logoutRedirectURI}`;
    return res.redirect(kakaoAuthURL);
  })
}
