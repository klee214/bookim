const express = require("express");
const router = express.Router();
const User = require('../models/User') 
const bcrypt= require("bcryptjs");
const validating = require('../middleware/validation.js')

router.get("/register",(req,res)=>{
    res.render("User/register");
});

router.post("/login",(req,res)=>{
    const errors = [];

    const emailForm = req.body.email;

    const passForm = req.body.password; 

    User.findOne({email: emailForm})
    .then(user=>{
        if(user == null)
        {
            errors.push("Sorry your email or password is wrong");
            res.render("User/register",{
                errors: errors
            })
        }
        else{

            // if(user.password == passForm)
            // {
            //     req.session.userInfo=user;

            //     if(user.type == "User")
            //         res.redirect(`/room/user_Dashboard/${user._id}`) // for now
            //     else if(user.type == "Admin")
            //         res.redirect(`/room/admin_Dashboard/${user._id}`);
            // }
            // else
            //     {
            //         errors.push("Sorry your email or password is wrong");
            //         res.render("User/register",{
            //             errors: errors
            //         })
            //     }

            bcrypt.compare(passForm, user.password)
            .then(match=>{
                if(match)
                {

                    req.session.userInfo=user;

                    if(user.type == "User")
                        res.redirect(`/room/user_Dashboard/${user._id}`) // for now
                    else if(user.type == "Admin")
                        res.redirect(`/room/admin_Dashboard/${user._id}`);
                }

                else
                {
                    errors.push("Sorry your email or password is wrong");
                    res.render("User/register",{
                        errors: errors
                    })
                }
            })
            .catch(err=>console.log(`Error :${err}`));
        }
    })
    .catch(err=>console.log(`Error :${err}`));

})

router.post("/logout",(req,res)=>{
        //This destorys the session
        req.session.destroy();
        res.redirect("/");
})

router.post("/register", validating ,(req,res)=>{

        const nodemailer = require('nodemailer');
        const sgTransport = require('nodemailer-sendgrid-transport');
        
        const options = {
            auth: {
                api_key: `${process.env.API_KEY}`
            }
        }

        const mailer = nodemailer.createTransport(sgTransport(options));
        const email = {
            to: [`${req.body.regemail}`],
            from: `${process.env.NODEMAILER_EMAIL}`,
            subject: 'Your account has been created! -BooKim.com-',
            text: 'Congratulation!! Your account has been created! Now you can fully enjoy our website!',
            html: '<b>Congratulation!! Your account has been created! Now you can fully enjoy our website!</b>'
        };
         
        mailer.sendMail(email, (err, res)=> {
            if (err) 
            { 
                console.log(err) 
            }
            console.log(res);
        });

        res.redirect("/user/dashboard");
    
})

router.get("/dashboard",(req,res)=>{
    res.render("User/dashboard")
})

module.exports = router;
