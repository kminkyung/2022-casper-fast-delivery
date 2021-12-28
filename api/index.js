const { Router } = require('express');
const authRouter = require('./routes/auth');
const axios = require('axios');

module.exports = () => {
  const app = Router();

  app.get('/', async (req, res, next) => {
    try {
      const token = req.session?.kakao?.token;
      console.log('token', token);

      // if (!token) {
      //   return res.redirect('/auth');
      // }

      const cars = await getFastDeliveryCars();
      return res.json(cars);

    } catch (e) {
      console.error(e);
      return next(e);
    }
  })

  authRouter(app);

  return app;
}

async function getFastDeliveryCars() {
  const source = 'https://casper.hyundai.com/gw/wp/product/v2/product/fast-delivery?carCode=AX01&sortCode=20&deliveryAreaCode=B&deliveryLocalAreaCode=B0&carEngineCode=&carTrimCode=&exteriorColorCode=&interiorColorCode=&deliveryCenterCode=&pageNo=1&pageSize=18';
  const { data } = await axios.get(source);
  if (data.rspStatus.rspCode !== '0000') {
    throw new Error('API 호출 실패');
  }

  const { searchcars: searchCars } = data.data;
  if (!searchCars.length) {
    return [];
  }

  // const theCarImLookingFor = searchCars.filter(car =>
  //   car.carEnginCode === 'T' &&
  //   car.carTrimName !== '스마트' &&
  //   car.carChoiceOption.find(option => option.choiceOptionCode === 'MNA')
  // )
  //
  // console.log('theCarImLookingFor', theCarImLookingFor);
  return searchCars;
}