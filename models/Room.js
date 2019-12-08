const mongoose = require("mongoose");

const schema = mongoose.Schema
const roomschema = new schema({
    admin : {
        type: String
    },
    title:{
        type:String
    },
    price:{
        type:String
    },
    picURL:{
        type:String
    },
    desc:{
        type:String
    },
    location :{
        postal:{
            type:String
        },
        stree:{
            type:String
        },
        city:{
            type:String
        },
        province:{
            type:String
        },
        country:{
            type:String
        }
    }
})

const room = mongoose.model('room',roomschema);

module.exports = room;