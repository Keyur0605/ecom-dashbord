const express = require("express");
const nodeMailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const Register = require("../models/register");
const bcrypt= require("bcrypt")

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const emailid = async (req, res) => {
    try {
        const {email} = req.body;
        const data = await Register.findOne({email});
    
        if(data){
            const token = await data.generateToken();
            res.cookie("jwt", token, {expires: new Date(Date.now() + 500000)});

            let random = randomIntFromInterval(1000, 9999).toString();

            await Register.updateOne({email}, {$set: {otp:random}});

            let transporter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                secure: true,
                port: 465,
                auth: {
                    user: process.env.ID, 
                    pass: process.env.PASS, 
                },
            });
            
            let info = {
                from: process.env.ID, 
                to: email, 
                subject: "OTP to reset password", 
                text: random,
            };
            
            transporter.sendMail(info, (err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Msg sent.");
                }
            });

            res.status(200).json({"msg": "Account exist."});
        }else{
            res.status(204).json({"msg": "Account does not exist."});
        }   
    } catch (err) {
        res.status(400).json({"msg": "Bad request."});
    }
}

const otp = async (req, res) => {
    try {
        const {email} = req.params;
        const {otp} = req.body;
        const data = await Register.findOne({email});
        const otpData = data.otp;
    
        if(otpData == otp){
            res.status(200).json({"msg": "OTP matched."});
        }
        else{
            res.status(204).json({"msg": "OTP not matched."});
        }   
    } catch (err) {
        res.status(400).json({"msg": "Bad request."});
    }
}

const resetPass = async (req, res) => {
    try {
        let {newpass, cnewpass} = req.body;
        let {email} = req.params;
        
        
        if(newpass == cnewpass){
            
            newpass = await bcrypt.hash(newpass, 10);
            cnewpass = await bcrypt.hash(cnewpass, 10);

            let data = {pass: newpass, cpass: cnewpass};
           
            
            await Register.updateOne({email}, {$set:data}, {new:true});
             await Register.updateOne({email}, {$set:{otp:"", token: ""}}, {new:true});
            const a = await Register.find({email});
            console.log(a,"dghjyku");
            res.status(201).json({"msg": "Password reset successfully."});
        }
        else{
            res.status(204).json({"msg": "Password not matched."});
        }      
    } catch (err) {
        res.status(400).json({"msg": "Bad request."});
        console.log(err);
    }
}

module.exports = {emailid, otp, resetPass}