const express = require("express");
const cookieParser = require("cookie-parser");

const logoutAdmin = async (req, res) => {
    try {
        req.user.token = " ";

        res.clearCookie("jwt");
        await req.user.save();
        res.status(200).json({"msg": "Admin logout successfully."});
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = logoutAdmin