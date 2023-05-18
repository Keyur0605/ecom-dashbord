const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    cpass: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default:""
    },
})

registerSchema.methods.generateToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "qwertyuiop[]asdfghjkl;'zxcvbnm,./");
        this.token = token;
        await this.save();
        return token;
    } catch (err) {
        res.send(err);
    }
}

registerSchema.pre("save", async function(next){
    if(this.isModified("pass")){
        this.pass = await bcrypt.hash(this.pass, 10);
        this.cpass = await bcrypt.hash(this.cpass, 10);
    }
    next();
})

const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;