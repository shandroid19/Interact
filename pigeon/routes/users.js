const User = require('../models/user')
const router = require('express').Router();
const bcrypt = require('bcrypt')
const authenticate = require('../authenticate')
const cors = require('./cors')
// router.get('/', authenticate.verifyUser, async(req,res)=>{

// })
router.route('/:id/get')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,async (req,res)=>{
        User.findOne({userId:req.params.id})
        .then((user)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json({username:user.username,followers:user.followers,followings:user.followings,profilePicture:user.profilePicture,city:user.city,name:user.name,bio:user.bio})
        }
    ).catch((err)=>{
        res.status(500).json(err)
    })

})

router.route('/:id/follow')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.put(cors.cors,async (req,res)=>{
        authenticate(req.headers.authorization).then((userid)=>{
            User.findOne({userId:req.params.id})
            .then((user)=>{
                user.followers.push(userid)
                user.save()
                User.findOne({userId:userid}).then((us)=>{us.followings.push(req.params.id);console.log(us.followings);us.save()})
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json({message:'success'})
            }
        ).catch((err)=>{
            res.status(500).json(err)
        })
    }).catch((err)=>{
        res.statusCode = 401;
        res.setHeader('Content-Type','application/json')
        res.json({err})
    })
})

router.route('/:id/unfollow')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.put(cors.cors,async (req,res)=>{
        authenticate(req.headers.authorization).then((userid)=>{
            User.findOne({userId:req.params.id})
            .then((user)=>{
                user.followers.splice(user.followers.indexOf(userid),1)
                user.save()
                User.findOne({userId:userid}).then((us)=>{us.followings.splice(us.followings.indexOf(req.params.id),1);us.save()})
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json({message:'success'})
            }
        ).catch((err)=>{
            res.status(500).json(err)
        })
    }).catch((err)=>{
        res.statusCode = 401;
        res.setHeader('Content-Type','application/json')
        res.json({err})
    })
})

router.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.put(cors.corsWithOptions,async (req,res)=>{
    authenticate(req.headers.authorization).then((userid)=>{
        User.findOneAndUpdate({userId:userid},req.body,{returnOriginal:false})
        .then((user)=>{
        res.send(user)
        }
    ).catch((err)=>{
        res.status(500).json(err)
    })
}).catch((err)=>{
    res.statusCode =401
    res.json(err)
})
})


// router.put('/:id/follow',authenticate.verifyUser,async (req,res)=>{
// if(req.user.userId !== req.params.id)
// {
//     try{
//         const user = await User.findById(req.params.id);
//         const thisuser = await User.findById(req.user.userId);
//         if(!user.followers.includes(req.user.userId))
//         {
//             await user.updateOne({$push:{followers: req.user.userId}});
//             await thisuser.updateOne({$push:{followings:req.params.id}});
//             res.json("follow successful")
//         }else{
//             res.status(403).json("you already follow this user")
//         }
//     } catch{
//         res.status(500).json(err)
//     }
// }else{
//     res.status(403).json("you cant follow yourself")
// }
// })

// router.put('/:id/unfollow',authenticate.verifyUser,async (req,res)=>{
//     user  = await User.findById(req.params.id)
//     thisuser = await User.fundById(req.user.userId)
//     if(user.followers.includes(req.user.userId))
//     {try{
//         await user.updateOne({$pull:{followers: req.user.userId}})
//         await thisuser.updateOne({$pull:{followings:req.params.id}})
//     }catch{res.status(500).json(err)}
//     }else{
//         res.status(403).json("you do not follow this user")
//     }
// })

module.exports = router