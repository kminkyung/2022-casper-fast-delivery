const axios = require("axios");
const qs = require("qs");

module.exports = {
  async send({cars, favoriteCars, token}) {
    const text = `
      현재 빠른 출고 차량수: ${cars.length}
      원하는 옵션에 가까운 차량: ${favoriteCars.length}
    `;

    const response = await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: qs.stringify({
        object_type: 'text',
        text,
        link: {
          web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar',
          mobile_web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar'
        },
        button_title: '바로 확인',
      })
    })

    console.log('response', response);
  }
}