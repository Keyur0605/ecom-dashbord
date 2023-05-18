const express = require("express");
const router = express.Router();
const {emailid, otp, resetPass} = require("../controllers/forgetpassword")

router.route("/").post(emailid);
router.route("/:email").post(otp);
router.route("/reset/:email").post(resetPass);

module.exports = router