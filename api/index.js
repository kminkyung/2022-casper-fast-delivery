const { Router } = require('express');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const carService = require('../services/car');
const kakaotalkService = require('../services/kakaotalk');

module.exports = () => {
  const app = Router();

  authRouter(app);
  userRouter(app);

  app.get('/', async (req, res, next) => {
    try {
      const token = req.session?.kakao?.token;
      console.log('token', token);

      // if (!token) {
      //   return res.redirect('/auth');
      // }

      const cars = await carService.findAll();

      if (token) {
        const favoriteCars = carService.filter(cars);
        await kakaotalkService.send({ cars, favoriteCars, token });
      }

      return res.json(cars);

    } catch (e) {
      console.error(e);
      return next(e);
    }
  })


  return app;
}

