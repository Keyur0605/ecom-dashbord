const express = require("express");
const Product = require("../models/product");

const addProduct = async (req, res) => {
    try {
        const { name, p_id, image, price, description } = req.body;

        const data = await Product.find({ p_id });

        if (data.length > 0) {
            res.status(409).json({ "msg": "Product Id already exists." });
        } else {
            const productData = Product({
                name,
                p_id,
                image,
                price,
                description
            })

            await productData.save();
            res.status(201).json({ "msg": "Product inserted." });
        }
    } catch (err) {
        res.status(400).json({ "msg": "Bad request." });
    }
}

const getProducts = async (req, res) => {
    try {
        const data = await Product.find();

        if (data.length > 0) {
            res.status(201).json(data);
        } else {
            res.status(404).json({ "msg": "Product does not exists." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getProduct = async (req, res) => {
    try {
        const data = await Product.find({ p_id: req.params.pid });

        if (data.length > 0) {
            res.status(201).json(data);
        } else {
            res.status(404).json({ "msg": "Product does not exists." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res) => {
    try {
        // const { name, image, price, description } = req.body;
        await Product.findOneAndUpdate({ p_id: req.params.pid }, req.body);
        res.status(204).json({ "msg": "Product data updated." });
    } catch (err) {
        res.status(400).json({ "msg": "Bad request." });;
    }
}

const deleteProduct = async (req, res) => {
    try {
        const p_id = req.params.pid;
        await Product.findOneAndDelete({ p_id });
        res.status(204).json({ "msg": "Product deleted." });
    } catch (err) {
        res.status(400).json({ "msg": "Bad request." });
    }
}

module.exports = { addProduct, getProducts, getProduct, updateProduct, deleteProduct };