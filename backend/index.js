const db = require('./db');
const express = require('express');
const cors = require('cors');

const port = 5000;
const app = express();
app.use(express.json());
db();

// Entry point
app.get('/', (req, res) => {
    res.send('Home Page');
})

// App routes
app.use(cors());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
