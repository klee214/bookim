const express = require("express");
const exphbs  = require('express-handlebars');
 
const app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'))
const PORT = process.env.PORT || 3000;

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