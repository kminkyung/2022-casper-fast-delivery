const express = require('express');
const router = express.Router();
const axios = require('axios').default;

/* GET home page. */
router.get('/', async (req, res, next) => {
  const source = 'https://casper.hyundai.com/gw/wp/product/v2/product/fast-delivery?carCode=AX01&sortCode=20&deliveryAreaCode=B&deliveryLocalAreaCode=B0&carEngineCode=&carTrimCode=&exteriorColorCode=&interiorColorCode=&deliveryCenterCode=&pageNo=1&pageSize=18';
  const { data } = await axios.get(source);
  if (data.rspStatus.rspCode !== '0000') {
    res.send('API 호출 실패');
  }

  const { searchcars: searchCars } = data.data;
  if (!searchCars.length) {
    res.send('빠른 출고 차량 없음');
  }

  const theCarImLookingFor = searchCars.filter(car =>
    car.carEnginCode === 'T' &&
    car.carTrimName !== '스마트' &&
    car.carChoiceOption.find(option => option.choiceOptionCode === 'MNA')
  )

  console.log('theCarImLookingFor', theCarImLookingFor);
  // const text = `
  //  현재 빠른 출고 차량수: ${searchCars.length}
  //  원하는 옵션에 가까운 차량: ${theCarImLookingFor.length}
  // `;

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'authorization': 'Bearer 09e37b98bd9146ac6c542aa4eae94b58'
  //   },
  //   data: {
  //     object_type: 'text',
  //     text,
  //     link: {
  //       web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar',
  //       mobile_web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar'
  //     },
  //     button_title: '바로 확인'
  //   },
  //   url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
  // };
  // const result = await axios(options);
  // console.log('result', result)

  res.json(searchCars);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
