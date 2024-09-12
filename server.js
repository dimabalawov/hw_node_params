const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.get('/category/:name', (req, res) => {
    const categoryName = req.params.name;

    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (data) => {
        let items;
        items = JSON.parse(data);
        const filteredItems = items.filter(item => item.name.toLowerCase() === categoryName.toLowerCase());

        res.json(filteredItems);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
