const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator")

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("E-mail is not valid.")
        }
    },
    pass: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default:""
    },
    otp: {
        type: String,
        default:""
    },
})

registerSchema.methods.generateToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.token = token + this._id;
        await this.save();
        return this.token;
    } catch (err) {
        res.send(err);
    }
}

registerSchema.pre("save", async function(next){
    if(this.isModified("pass")){
        this.pass = await bcrypt.hash(this.pass, 10);
    }
    next();
})

const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;