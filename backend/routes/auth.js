const express =  require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        name: 'Shakir',
        age: '25',
    })
})

module.exports = router;