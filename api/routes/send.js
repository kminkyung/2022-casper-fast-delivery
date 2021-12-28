const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require("qs");
const config = require("../../config");

router.get('/', async (req, res, next) => {


  const text = `
   현재 빠른 출고 차량수: ${searchCars.length}
   원하는 옵션에 가까운 차량: ${theCarImLookingFor.length}
  `;

  await axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify({
      object_type: 'text',
      text: '',
      link: {
        web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar',
        mobile_web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar'
      },
      button_title: '바로 확인',
    })
  })
});

module.exports = router;
