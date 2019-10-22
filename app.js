const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'))
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
 

app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log("connected");
});

app.get("/",(req,res)=>{
    res.render("home");
});


app.get("/room",(req,res)=>{
    res.render("room");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/",(req,res)=>{
    const errorMessage = [];

    const emailForm = `${req.body.email}`;

    const passForm = `${req.body.password}`; 

    if(emailForm.length == 0){
        errorMessage.push("email is empty")
    }

    if(passForm.length == 0){
        errorMessage.push('password is empty')
    }

    if(errorMessage == 0){
        res.redirect("/") //for now
    }else{
        res.render("home") //for now
        console.log(errorMessage)
    }
})

app.post("/register",(req,res)=>{
    const errorMessage = [];
    const errorfield = []
    const emailVal = req.body.regemail
    const fname = req.body.fname
    const lname = req.body.lname
    const password = req.body.regpassword

    const emailFomr = /[a-z0-9].*[@].*[.].*[a-z]/i
    const nameForm = /[^0-9\`\~\!\@\#\$\%\^\&\*\(\)\_\-\|\+\=\{\}\[\]\:\'\;\"\<\,\.\>\/\?\\]/
    const passForm = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*?"

    if(!emailFomr.test(emailVal) || emailVal.length == 0 ){
        errorMessage.push("**invalid email! (eg. abc@def.xyz)")
        errorfield.push('1')
    }

    if(fname.length == 0){
        errorMessage.push("**first name is required!")    
    }else if(!nameForm.test(fname)){
        errorMessage.push("**invalid first name!")
    }

    if(lname.length == 0){
        errorMessage.push("**last name is required!")    
    }else if(!nameForm.test(lname)){
        errorMessage.push("**invalid last name!")
    }

    let count = 0;
    if(!password.length==0){
        for(let i = 0; i < passForm.length; i++){
            if(password.indexOf(passForm[i]) != -1){
                break;
            }else{
                count++;
            }
        }

        if(count > 0){
            errorMessage.push("**password must contain upper cases and special characters!")
        }

    }else{
        errorMessage.push("**password is required!")
    }
        
    if(errorMessage.length != 0){
        res.render("register", {
            errMessage: errorMessage
        })
    }
    else{
        const nodemailer = require('nodemailer');
        const sgTransport = require('nodemailer-sendgrid-transport');
        
        const options = {
            auth: {
                api_key: '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'
            }
        }

        const mailer = nodemailer.createTransport(sgTransport(options));
        const email = {
            to: [`${req.body.regemail}`],
            from: 'kiminlee0505@gmail.com',
            subject: 'Your account has been created! -BooKim.com-',
            text: 'Congratulation!! Your account has been created! Now you can fully enjoy our website!',
            html: '<b>Congratulation!! Your account has been created! Now you can fully enjoy our website!</b>'
        };
         
        mailer.sendMail(email, (err, res)=> {
            if (err) { 
                console.log(err) 
            }
            console.log(res);
        });

        const mongoose = require('mongoose');
        mongoose.connect('mongodb+srv://kiminlee:als246800@cluster0-ow8ur.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
        .then(()=>{
            console.log("succeed to log onto mongoose!!")
        })
        .catch((err)=>{
            console.log("fail to log onto mongoose..." + `${err}`)
        })

        const schema = mongoose.Schema
        const userAccSchema = new schema({
            email:{
                type:String,
                required:true
            },
            fname:{
                type:String,
                required:true
            },
            lname:{
                type:String,
                required:true
            },
            password:{
                type:String,
                required:true
            }
        })
        const userAcc = mongoose.model('userAcc',userAccSchema);
        const user = new userAcc({
            email:`${req.body.regemail}`,
            fname: `${req.body.fname}`,
            lname: `${req.body.lname}`,
            password:`${req.body.regpassword}`
        })
        user.save()
        .then(()=>{
            console.log("succeed to save")
        })
        .catch((error)=>{
            console.log("error occurs! " + `${error}`)
        })
        res.redirect("/dashboard");
    }
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})