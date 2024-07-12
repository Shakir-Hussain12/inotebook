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

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'iNoteBook API',
      version: '1.0',
      description: 'API documentation for iNoteBook application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = { swaggerOptions, loadRoutes };
