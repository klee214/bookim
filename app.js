const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require("express-session");
const fileupload = require("express-fileupload");
const methodOverride = require('method-override');
require('dotenv').config({ path:'./config/key.env'})

const app = express();
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");
const generalRouter = require("./routes/general");
const bookRouter = require("./routes/book");

app.use(fileupload())
app.use(express.static('public'))
app.use(session({secret:"This is my secret key. This should not be shown to everyone"}))
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req,res,next)=>{

    //This is a global variable that can be accessed by templates
    res.locals.user= req.session.userInfo;
    next();
})

app.use('/room',roomRoutes);
app.use('/user',userRoutes);
app.use('/',generalRouter);
app.use('/book',bookRouter);

app.use('/',(req,res,next)=>{
    res.render("General/404")
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{
    console.log("connected");
});
const MONGO_DB_URL = `mongodb+srv://${process.env.DB_USER_ID}:${process.env.DB_USER_PASSWORD}@cluster0-ow8ur.mongodb.net/${process.env.DB_COLLECTION_NAME}?retryWrites=true&w=majority`;
mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("succeed to log onto mongoose!!")
})
.catch((err)=>{
    console.log("fail to log onto mongoose..." + `${err}`)
})
