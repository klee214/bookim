const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Room = require('../models/Room')

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
    },
    type :{
        type:String,
        default:"User"
    },
    birthdate:{
        type:Date,
        default: Date.now()
    },
    book :[{
        roomID :{
            type: schema.Types.ObjectId,
            ref : Room
        },
        startDate:{
            type:Date,
            default: Date.now()
        },
        endDate:{
            type:Date,
            default: Date.now()
        }
    }]
});

userAccSchema.pre("save",function(next){
    bcrypt.genSalt(10)
    .then(salt=>{
        bcrypt.hash(this.password,salt)
        .then(hash=>{
            this.password=hash;
            next();
        });
    });
});

const userAcc = mongoose.model('userAcc',userAccSchema);

module.exports = userAcc;