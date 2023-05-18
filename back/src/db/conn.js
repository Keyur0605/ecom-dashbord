const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://harshbhayani05:m0zrD6YdMOQ7sC2s@cluster.ltkjsav.mongodb.net/", {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => console.log("Database Connected...")).catch((err) => console.log(err));