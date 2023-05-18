const express = require('express');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const Register = require("../models/register");

const app = express();
app.use(cookieParser());

const auth = async (req, res, next) => {
    try {
        const token = req.cookies;
        const token2 = token.jwt;
        const verifyUser = jwt.verify(token2, process.env.SECRET_KEY);
        const user = await Register.findOne({_id:verifyUser._id});
        req.token = token;
        req.user = user;
        next(); 
    } catch (err) {
        res.status(401).json({"msg": "Admin does not exist."});
    }
}

module.exports = auth;