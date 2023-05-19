const express = require("express");
const Register = require("../models/register");

const deleteAcc = async (req, res) => {
    try {
        let token = req.cookies;
        let token2 = token.jwt;
        let _id = token2.substr(-24);
        await Register.findOneAndDelete({_id});
        req.user.token = " ";
        res.clearCookie("jwt");
        await req.user.save();
        res.status(200).json({"msg": "Account deleted successfully."});
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = deleteAcc