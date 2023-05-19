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
        let token3 = token2.substring(0,149);
        const verifyUser = jwt.verify(token3, process.env.SECRET_KEY);
        const user = await Register.findOne({_id:verifyUser._id});
        req.token = user.token;
        req.user = user;
        next(); 
    } catch (err) {
        res.status(401).json({"msg": "Admin does not exist."});
    }
}

module.exports = auth;