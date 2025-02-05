"use strict"

const Product = require('../models/product')

function getProduct (req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Failed to make the petition: ${err}`})
        if (!product) return res.status(404).send({message: `The product doesn't exists.`})
        
        res.status(200).send({product})
    })
}

function getProducts (req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Failed to make the petition: ${err}`})
        if (!products) return res.status(404).send({message: "There's no stored products."})
    
        res.status(200).send({products})
        // res.send(200, {products})
    })
}

function saveProduct (req, res) {
    console.log(req.body)
    // Muestra los datos enviados
    console.log('POST /api/product')

    let product = new Product()
    product.name = req.body .name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: `Error when trying to save the new product: ${err}`})
        res.status(200).send({product: productStored})
    })
}

function updateProduct (req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        console.log(productUpdated)
        if (err) res.status(500).send({message: `Error when trying to update the product: ${err}`})
        res.status(200).send({product : productUpdated})
    })
}

function deleteProduct (req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `Error when trying to delete the product: ${err}`})
        
        product.remove(err => {
            if (err) res.status(500).send({message: `Error when trying to save the new product: ${err}`})
            res.status(200).send({message: 'The product has been correctly deleted.'})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}