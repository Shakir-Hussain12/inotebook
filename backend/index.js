const db = require('./db');
const express = require('express');

const port = 3000;
const app = express();
db();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
