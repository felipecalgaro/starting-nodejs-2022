const express = require('express');
const { randomUUID } = require('crypto')
const fs = require('fs');


const app = express()

app.use(express.json())

let products = []

fs.readFile("products.json", "utf-8", (err, data) => {
    err ? console.log(err) : products = JSON.parse(data)
})

app.post("/products", (req, res) => {
    const { name, price } = req.body

    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)

    productFile()
 
    return res.json(product)
})

app.get("/products", (req, res) => {
    return res.json(products)
})

app.get("/products/:id", (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id === id)
    return res.json(product)
})

app.put("/products/:id", (req, res) => {
    const { id } = req.params
    const { name, price } = req.body

    const productIndex = products.findIndex(product => product.id === id)
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    productFile()

    return res.json({ message: "produto alterado" })
})

app.delete("/products/:id", (req, res) => {
    const { id } = req.params

    const productIndex = products.findIndex(product => product.id === id)

    products.splice(productIndex, 1)

    productFile()

    return res.json({ message: "produto removido" })
})

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), err => {
        err ? console.log(err) : console.log("produto inserido");
    })
}

app.listen(3001, () => console.log("server na porta 3001"))

