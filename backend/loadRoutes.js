const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
  const routesPath = path.join(__dirname, 'routes');
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const route = require(path.join(routesPath, file));
      app.use(`/api/${file.replace('.js', '')}`, route);
    }
  });
};

module.exports = { loadRoutes };
