const express = require('express');
const app = express();

app.use((_, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/users', (req, res) => {
    const { offset, limit } = req.query;
    let result = [];
    for (let i = parseInt(offset); i < parseInt(offset) + parseInt(limit); i++) {
        result.push({ id: i + 1, name: 'name' + (i + 1) });
    }
    res.json(result);
})

app.listen(8000)
