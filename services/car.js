const axios = require("axios");

module.exports = {
  async findAll() {
    const source = 'https://casper.hyundai.com/gw/wp/product/v2/product/fast-delivery?carCode=AX01&sortCode=20&deliveryAreaCode=B&deliveryLocalAreaCode=B0&carEngineCode=&carTrimCode=&exteriorColorCode=&interiorColorCode=&deliveryCenterCode=&pageNo=1&pageSize=18';
    const { data } = await axios.get(source);
    if (data.rspStatus.rspCode !== '0000') {
      throw new Error('API 호출 실패');
    }

    const { searchcars: searchCars } = data.data;
    if (!searchCars.length) {
      return [];
    }


    return searchCars;
  },

  filter(cars) {
    if (!cars.length) return [];
    return cars.filter(car =>
      car.carEnginCode === 'T' &&
      car.carTrimName !== '스마트' &&
      car.carChoiceOption.find(option => option.choiceOptionCode === 'MNA')
    )
  }
}