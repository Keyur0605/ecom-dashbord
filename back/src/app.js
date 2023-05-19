require('dotenv').config()
const express = require("express");
const cookieParser = require("cookie-parser");
const Product = require("./models/product");
const Register = require("./models/register");
const port = process.env.PORT || 8000;
require("./db/conn")
const auth = require('../src/middleware/auth');
const product_router = require("./routes/product");
const register_router = require("./routes/register");
const login_router = require("./routes/login");
const logout_router = require("./routes/logout");
const forgetpass_router = require("./routes/forgetpassword");
const deleteacc_router = require("./routes/deleteaccount");

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Products Api"));

app.use("/products", product_router);
app.use("/register", register_router);
app.use("/login", login_router);
app.use("/logout", logout_router);
app.use("/forgetpassword", forgetpass_router);
app.use("/deleteacc", deleteacc_router);

app.listen(port, () => console.log(`Listening at port ${port}`));