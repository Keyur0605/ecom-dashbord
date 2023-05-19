const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const deleteAcc = require("../controllers/deleteaccount");

router.route("/").delete(auth, deleteAcc);

module.exports = router