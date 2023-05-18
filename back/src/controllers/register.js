const express = require("express");
const Register = require("../models/register");

const registerAdmin = async (req, res) => {
    try {
        const {name, email, pass, cpass} = req.body;
    
        const data = await Register.find({email});
    
        if(data.length>0){
            res.status(409).json({"msg": "User already exists."});
        }else{
            const user = Register({
                name,
                email,
                pass, 
                cpass
            })
    
            const token = await user.generateToken();
            res.cookie("jwt", token, {expires: new Date(Date.now() + 86400*1000)});
    
            await user.save();
            res.status(201).json({"msg": "User created."});
        }
    } catch (err) {
        res.status(400).json({"msg": "Bad request."});
    }
}

module.exports = registerAdmin