const express = require("express");
const bcrypt = require("bcrypt");
const Register = require("../models/register");

const loginAdmin = async (req, res) => {
    try {
        const {email, pass} = req.body;
    
        const data = await Register.find({email});
    
        if(data.length>0){
            const isMatch = await bcrypt.compare(pass, data[0].pass);
            
            if(isMatch){
                const data2 = data[0];
                const token = await data2.generateToken();
                res.cookie("jwt", token, {expires: new Date(Date.now() + 86400*1000)});
    
                res.status(201).json({"msg": "Admin Login successfully."});
            }else{
                res.status(401).json({"msg": "Email or Password invalid."});
            }
        }else{
            res.status(401).json({"msg": "Admin does not exist."});
        }     
    } catch (err) {
        res.status(400).json({"msg": "Bad request."});
    }
}

module.exports = loginAdmin;