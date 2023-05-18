const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {addProduct, getProducts, getProduct, updateProduct, deleteProduct} = require("../controllers/product");

router.route("/").post(auth, addProduct);
router.route("/").get(auth, getProducts);
router.route("/:pid").get(auth, getProduct);
router.route("/:pid").put(auth, updateProduct);
router.route("/:pid").delete(auth, deleteProduct);

module.exports = router;