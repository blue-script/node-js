"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }];
const addresses = [{ id: 1, value: 'Nezalej 12' }, { id: 2, value: 'Selickaga 11' }];
app.use(express_1.default.json());
app.get('/products', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.includes(searchString)));
    }
    else {
        res.send(products);
    }
});
app.post('/products', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    const address = addresses.find(a => a.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
