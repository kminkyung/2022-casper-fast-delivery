const express = require('express');
const config = require('./config');
const loaders = require('./loaders');
const port = process.env.PORT || 3000;


async function startServer() {
  const app = express();

  await loaders({ app });
  app.listen(config.port, () => console.log(`Server running at: http://localhost:${port}`));
}

startServer();