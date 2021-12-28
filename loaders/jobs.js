const CronJob = require('cron').CronJob;
const axios = require('axios');

module.exports = () => {
  const job = new CronJob('0 * * * * *', async function () {
    await axios.get('http://15.165.118.140/');
  }, null, true, 'Asia/Seoul');
  job.start();
}
