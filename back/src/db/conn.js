const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => console.log("Database Connected...")).catch((err) => console.log(err));