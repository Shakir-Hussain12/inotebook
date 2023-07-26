const db = require('./db');
const express = require('express');

const port = 3000;
const app = express();
db();
app.use(express.json());

// Entry point
app.get('/', (req, res) => {
    res.send('Home Page');
})

// App routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
