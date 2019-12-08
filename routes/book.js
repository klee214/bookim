const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Room = require("../models/Room")
const validating = require('../middleware/auth.js')


router.get('/:id',validating,(req,res)=>{
    Room.findById(req.params.id)
    .then(room=>{
        res.render('Book/booking',{
            room
        })
    })
})

router.post('/:id', validating ,(req,res)=>{

    User.findByIdAndUpdate(req.session.userInfo._id,{
        $push:{book : {roomID : req.params.id}}
    })
    .then(user=>{
        console.log(user)
        res.redirect(`/room/user_Dashboard/${req.session.userInfo._id}`)
    })
    
})

module.exports = router;