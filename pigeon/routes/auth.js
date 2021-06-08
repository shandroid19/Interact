const router = require('express').Router();
const User = require("../models/user");
// const bcrypt = require('bcrypt');
const authenticate = require('../authenticate');
const cors = require('./cors');
// const passport = require('passport');


router.route('/login')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.post(cors.cors,async (req,res)=>{
    authenticate(req.headers.authorization).then((userid)=>{
        User.find({userId:userid}).then((user)=>{
            if(!user.length) throw new Error('not found')
            const response = {userId:user[0].googleId,username:user[0].username,profilePicture:user[0].profilePicture,coverPicture:user[0].coverPicture,city:user[0].city,bio:user[0].bio,followers:user[0].followers.length-1,followings:user[0].followings.length-1,posts:user[0].posts} 
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json({status:'logged in successfully', user: response})
            }).catch(err=>{    res.statusCode = 500;
                res.setHeader('Content-Type','application/json')
                res.json(err)
                console.log(err)})
    })
    .catch((err)=>{
        res.statusCode = 403;
        res.setHeader('Content-Type','application/json')
        res.json(err)
        console.log(err)
    });

    
})

router.route('/signup')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200)})
.post(cors.cors,(req,res)=>{
    authenticate(req.headers.authorization).then((userid)=>{
        User.create({userId:userid,name:req.body.name,username:req.body.username,email:req.body.email,city:req.body.city,
            profilePicture:req.body.profilePicture,
            coverPicture:req.body.coverPicture,bio:req.body.bio,followers:[userid],followings:[userid]}) 
        .then((user)=>{
        const saved = user.save()
        // res.statusCode = 200;
            // res.setHeader('Content-Type','application/json')
    // res.json({status:'signed in successfully', user: user})
            console.log(saved)
            res.statuscode = 200;
            res.setHeader('Content-Type','application/json')
            res.json({success: true,user:saved,status: 'registration successful'})
        })
        .catch((err)=>{
        res.statusCode = 500;
            res.setHeader('Content-Type','application/json')
            res.json(err)
        console.log(err)
        })
    }).catch((err)=>{res.statusCode = 500;
        res.setHeader('Content-Type','application/json')
        res.json({"error":err})
    })

})
//     router.route('/signup')
//     .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
//     .post(cors.cors,(req,res,next)=>{
//     users = new User({username:req.body.username, email:req.body.email,profilePicture:req.body.profilePicture,coverPicture:req.body.coverPicture,city:req.body.city,bio:req.body.bio})
//     User.register(users,
//     req.body.password, (err,user)=>{
//         if(err){
//             res.statusCode = 500;
//             res.setHeader('Content-Type','application/json');
//             res.json({err:err});
//             console.log(err)
//             // res.send(req.body)
//         }
//         else{
//             passport.authenticate('local')(req,res,()=>{
//                 res.statuscode = 200;
//                 res.setHeader('Content-Type','application/json')
//                 res.json({success: true,user:req.user,status: 'registration successful'})
//             })
//         }
//     })
// })
// router.route('/logout')
// .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
// .get(cors.cors,authenticate.verifyUser,(req,res)=>{
//     try{
//         req.logOut();
//         res.statusCode = 200;
//         res.setHeader('Content-Type','application/json')
//         res.json({success:true,user:req.user,status:'successfully logged out'})
//     }
//     catch(err){
//         console.log(err)
//         res.status(401).json(err)
//     }
//     }).options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

// router.route('/login')
// .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
// .post(cors.cors,passport.authenticate('local'),(req,res)=>{
//     try{
//     var token = authenticate.getToken({_id: req.user._id});
//         res.statusCode = 200;
//         res.setHeader('Content-Type','application/json')
//         res.json({success:true,token:token,user:req.user,status:'successfully logged in'})
//     }
//     catch(err){
//         console.log(err)
//         res.status(401).json(err)
//     }
//     }).options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

module.exports = router;