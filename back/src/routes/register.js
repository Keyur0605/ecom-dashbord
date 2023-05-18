const express = require("express");
const router = express.Router();
const registerAdmin = require("../controllers/register");

router.route("/").post(registerAdmin);

module.exports = router