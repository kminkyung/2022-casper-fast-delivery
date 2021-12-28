const axios = require("axios");

module.exports = {
  async send({cars, favoriteCars, token}) {
    const requestData = {
      object_type: 'text',
      text: `현재 빠른 출고 차량수: ${cars.length} \n원하는 옵션에 가까운 차량: ${favoriteCars.length}`,
      link: {
        web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar',
        mobile_web_url: 'https://casper.hyundai.com/vehicles/car-list/fastcar'
      },
      button_title: '바로 확인'
    }

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `template_object=${JSON.stringify(requestData)}`
      });

      console.log('response.data.result_code', response.data.result_code);

    } catch (e) {
      console.error('카카오톡 메세지 전송 실패');
      console.error(e.response.data);
    }



  }
}