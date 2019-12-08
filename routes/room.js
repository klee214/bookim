const express = require("express");
const router = express.Router();
const hasAccess = require("../middleware/auth")
const User = require("../models/User")
const path = require("path");
const Room = require("../models/Room")

router.get("/",(req,res)=>{
    
    Room.find()
    .then(rooms=>{
        res.render("Room/room",{
            newRoom:rooms
        })
    })
    .catch(err=>console.log(`Error : ${err}`));
});

router.get("/dashboard/:id",hasAccess,(req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        if(user.type == "User")
        {
            res.redirect(`/room/user_Dashboard/${req.params.id}`)
        }
        else
        {
            res.redirect(`/room/admin_Dashboard/${req.params.id}`)
        }
    })
})

router.get("/user_Dashboard/:id",hasAccess,(req,res)=>{

    User.findById(req.params.id)
    .then(user=>{
        const bookedRooms = []

        for(let i = 0; i < user.book.length; ++i)
        {
            Room.findById(user.book[i].roomID)
            .then(room=>{
                bookedRooms.push(room)
            })
            .then(()=>{
                if(bookedRooms.length == user.book.length)
                {
                    res.render("Room/userDash",{
                        bookedRooms
                    })
                }
            })
            .catch(err=>{
                console.log(`err ${err}`)
            })
        }
    })
})

router.get("/admin_Dashboard/:id",hasAccess,(req,res)=>{
    Room.find({admin : req.session.userInfo.email})
    .then(rooms=>{
        res.render("Room/adminDash",{
            rooms
        })
    })
})

router.get("/editRoom/:id", hasAccess,(req,res)=>{
    Room.findOne({_id : req.params.id})
    .then(room=>{
        console.log(room)
        res.render("Room/editRoom", {
            room : room
        })
    })
})

router.put("/editRoom/:id",hasAccess,(req,res)=>{

    createRoomError = [];

    Room.findById(req.params.id)
    .then(room=>{

        if(isNaN(req.body.roomPrice))
        {
        console.log("digit")
        createRoomError.push("Only numbers or '.' are accepted for the price!")
        }

        if(req.files)
        {
            if(req.files.roomPic.mimetype.indexOf("image")==-1)
            {
                console.log("img")
                createRoomError.push("Image files only! : Example (jpg, gif, png)")
            }

        }
        if(createRoomError.length == 0)
        {
            room.title = req.body.roomTitle;
            room.location.city = req.body.city;
            room.price = req.body.roomPrice;
            room.location.province = req.body.province;
            room.location.country = req.body.country;

            console.log(req.files.roomPic.name)
            if(req.files)  
            {
                req.files.roomPic.name = `db_${room._id}${req.files.roomPic.name}${path.parse(req.files.roomPic.name).ext}`;
                room.picURL = req.files.roomPic.name;
    
                req.files.roomPic.mv(`public/uploads/${req.files.roomPic.name}`)
                .then(()=>{
                    room.save()
                    .then(()=>{
                        res.redirect(`/room/admin_Dashboard/${req.session.userInfo._id}`)
                    })
                })
            }
            else{
                res.redirect(`/room/admin_Dashboard/${req.session.userInfo._id}`)
            }
        }
        else
        {
            console.log("rendering")
            res.render("Room/editRoom",{
                createRoomError:createRoomError
            })
        }
    })
})

router.get("/admin/createRoom/:id",hasAccess,(req,res)=>{
    res.render("Room/roomCreate")
})

router.post("/admin/createRoom/:id",hasAccess,(req,res)=>{
    console.log("creating")
    createRoomError = [];

    const lowerCase = /[a-z]/
    const postVal = /[A-Z][0-9][A-Z][A-Z][0-9][A-Z]/

    if(lowerCase.test(req.body.city))
    {
        createRoomError.push("Only uppercase for the city")
    }

    if(lowerCase.test(req.body.province))
    {
        createRoomError.push("Only uppercase for the province")
    }

    if(lowerCase.test(req.body.country))
    {
        createRoomError.push("Only uppercase for the country")
    }

    if(!postVal.test(req.body.postal))
    {
        console.log("postal")
        createRoomError.push("Invalid postal code!")
    }
    
    if(isNaN(req.body.roomPrice))
    {
        console.log("digit")
        createRoomError.push("Only numbers or '.' are accepted for the price!")
    }


    if(req.files.roomPic.mimetype.indexOf("image")==-1)
    {
        console.log("img")
        createRoomError.push("Image files only! : Example (jpg, gif, png)")
    }

    if(createRoomError.length == 0)
    {
        User.findById(req.params.id)
        .then(user=>{
            console.log(user._id)
            console.log(path.parse(req.files.roomPic.name))

            req.files.roomPic.name = `db_${user._id}${req.files.roomPic.name}${path.parse(req.files.roomPic.name).ext}`;

            console.log(req.files.roomPic.name)

            const newRoom ={
                admin : req.session.userInfo.email,
                title: req.body.roomTitle,
                price: req.body.roomPrice,
                desc: req.body.desc,
                picURL : req.files.roomPic.name,
                location :{
                    postal: req.body.postal,
                    stree: req.body.street,
                    city: req.body.city,
                    province: req.body.province,
                    country: req.body.country
                }
            };
    
            req.files.roomPic.mv(`public/uploads/${req.files.roomPic.name}`)
            .then(()=>{
                const room = new Room(newRoom)
                room.save()
                .then(()=>{
                    console.log(`The room is hosted!`)
    
                    res.redirect(`/room/admin_Dashboard/${req.params.id}`); 
                })
                .catch(err=>console.log(`Error :${err}`));
            })
            .catch(err=>console.log(`Error :${err}`));
        })
    }
    else
    {
        console.log("rendering")
        res.render("Room/roomCreate",{
            createRoomError:createRoomError
        })
    }
})

router.get('/roomByCity/:city',(req,res)=>{
    console.log(req.params.city)
    Room.find({'location.city' : req.params.city})
    .then(rooms=>{

        console.log(rooms)
        res.render('Room/roomByCity',{
            rooms,
            room: rooms[0]
        })
    })
})
module.exports = router;