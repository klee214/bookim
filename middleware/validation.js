const User = require('../models/User')
const bcrypt= require("bcryptjs");

const validating = (req,res,next)=>{

    const errorMessage = [];
    const errorfield = []
    const emailVal = req.body.regemail
    const fname = req.body.fname
    const lname = req.body.lname
    const password = req.body.regpassword

    const emailFomr = /[a-z0-9].*[@].*[.].*[a-z]/i
    const nameForm = /[^0-9\`\~\!\@\#\$\%\^\&\*\(\)\_\-\|\+\=\{\}\[\]\:\'\;\"\<\,\.\>\/\?\\]/
    const passForm = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const passDigit = "1234567890"

    if(fname.length == 0)
    {
        errorMessage.push("**first name is required!")    
    }
    else if(!nameForm.test(fname))
    {
        errorMessage.push("**invalid first name!")
    }

    if(lname.length == 0)
    {
        errorMessage.push("**last name is required!")    
    }
    else if(!nameForm.test(lname))
    {
        errorMessage.push("**invalid last name!")
    }

    let count = 0;
    if(!password.length==0)
    {
        for(let i = 0; i < passForm.length; i++)
        {
            if(password.indexOf(passForm[i]) != -1)
            {
                if(password.indexOf(passDigit[i] != -1))
                {
                    count++;
                }
            }
        }

        if(count == 0)
        {
            errorMessage.push("**password must contain upper cases and number!")
        }

    }
    else
    {
        errorMessage.push("**password is required!")
    }

    if(!emailFomr.test(emailVal) || emailVal.length == 0 )
    {
        errorMessage.push("**invalid email! (eg. abc@def.xyz)")
        errorfield.push('1')
    }
    else
    {
        User.findOne({email:emailVal})
        .then(user=>{
            if(user != null)
            {
                errorMessage.push("**the same email already exist!")
                console.log(errorMessage)
            }
            
            if(errorMessage.length != 0){
                res.render("User/register", {
                    errMessage: errorMessage
                })
            }
            else
            {
                const newUser ={
                    email: req.body.regemail,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    password:req.body.regpassword
                }
        
                const user = new User(newUser)
                user.save()
                .then(()=>{
                    console.log("succeed to save")
                })
                .catch((error)=>{
                    console.log("error occurs! " + `${error}`)
                })
        
                next();
            }

        })
    }     

    console.log(errorMessage)
}

module.exports = validating;