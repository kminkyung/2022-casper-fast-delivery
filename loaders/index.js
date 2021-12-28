const expressLoader = require('./express');
const jobLoader = require('./jobs');

module.exports = async ({ app }) => {
  await expressLoader({ app });
  console.info('Express Loaded 👍');

  await jobLoader();
  console.info('Jobs loaded 👍');
}
