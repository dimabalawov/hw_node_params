const express = require('express');
const fs = require('fs');
const path = require('path');
var routerProduct = express.Router();
var routerCategory = express.Router();
const app = express();
const port = 8080;

var pathLogger = 'logger.txt';
app.use(function(request, response, next ){
    var data = `Address : ${request.ip}; Time: ${new Date().toLocaleString()}; URL : ${request.url}\n`;

    fs.appendFile(pathLogger, data, function(err){
        console.log('data wrote');
    });
    next();
});

const productsFilePath = path.join(__dirname, 'products.json');
const categoryFilePath = path.join(__dirname, 'category.json');

routerProduct.route("/")
    .get(function (req, res) {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    });
routerProduct.route("/:id")
    .get(function (req, res) {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(data); 
        const productName = req.params.id; 


        const filteredProducts = products.filter(products => products.name === productName);


        res.json(filteredProducts);
    });

app.use("/products", routerProduct);

routerCategory.route("/")
    .get(function (req, res) {
        const data = fs.readFileSync(categoryFilePath, 'utf8');
        const category = JSON.parse(data);
        res.json(category);
    });
routerCategory.route("/:id")
    .get(function (req, res) {
        const data = fs.readFileSync(categoryFilePath, 'utf8');
        const categories = JSON.parse(data); 
        const categoryName = req.params.id; 


        const filteredCategory = categories.filter(category => category.name === categoryName);


        res.json(filteredCategory);
    });
 

app.use("/category", routerCategory);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
