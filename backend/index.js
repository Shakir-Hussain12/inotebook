const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./db');

const port = 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
db();

app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000']; // Add other origins as needed
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Entry point
app.get('/', (req, res) => {
  res.send('Home Page');
});

// App routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
