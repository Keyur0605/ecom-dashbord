const express = require("express");
const router = express.Router();
const loginAdmin = require("../controllers/login");

router.route("/").post(loginAdmin);

module.exports = router