const db = require('./db');
const express = require('express');

const port = 3000;
const app = express();
db();

app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
