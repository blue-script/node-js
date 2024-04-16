import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Nezalej 12'}, {id: 2, value: 'Selickaga 11'}]

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchString = req.query.title.toString()
        res.send(products.filter(p=>p.title.includes(searchString)))
    } else {
        res.send(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})