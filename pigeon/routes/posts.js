const router = require('express').Router()
const Post = require('../models/posts')
const User = require('../models/user')
const authenticate = require('../authenticate')
const cors = require('./cors')

router.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.put(cors.corsWithOptions,(req,res)=>{
    authenticate(req.headers.authorization).then((userid)=>{
      User.findOne({userId:userid}).then((user)=>{
      user.posts.push({username:user.username,userId:userid,
        profilePicture:user.profilePicture,caption:req.body.caption,
        img:req.body.image})
        user.save().then((saved)=>res.status(200).json(saved))
      //   .then((newPost)=>{
      //     console.log(newPost)
      //     newPost.save().then((saved)=>res.status(200).json(saved))
      //     .catch((err)=>{
      //     res.status(500).json(err)
      // })
      //   })
      })
      .catch((err)=>{res.statusCode=401
        res.setHeader('Content-Type','application/json')
      res.json(err)}) 
    }
    ).catch((err)=>{
      res.statusCode = 401;
      res.setHeader('Content-Type','application/json')
      res.json(err)
      console.log(err)
    })
   
})
.get(cors.cors,(req,res)=>{
  authenticate(req.headers.authorization).then((userid)=>{
    
      User.find({userId:userid}).then((user)=>{       
      if(user[0].followings){        
        Promise.all(    
    user[0].followings.map(async (friendId)=>{
      const userr = await User.findOne({userId:friendId})
      const posts = userr.posts
      return posts
  })
    ).then((friendposts)=>{
      var collection = []
      for (let i=0;i<friendposts.length;i++){
        for (let j=0;j<friendposts[i].length;j++){
        collection.push(friendposts[i][j])
        }
      }
      const pageCount = Math.ceil(collection.length / 5);
      let page = parseInt(req.query.p);
      if (!page) page = 1;
      // if (page > pageCount) page = pageCount
  
      const output= (page > pageCount)?[]:collection.slice(page*5-5,page*5)
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json')
      res.json({posts:output,pages:pageCount})
      
    }).catch((err)=>{res.status(500).json(err)})
    }
        
    else
    {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json')
      res.json({})
    }
        })
    // Post.find({userId:req.user._id}).then((yourposts)=>{
    //   Promise.all(
    //     req.user.followings.map((friendId)=>{
    //       return Post.find({UserId:friendId})
    //     })).then((friendPosts)=>{
    //       res.json(yourposts.concat(...friendPosts))
    //     })
    // }).catch((err)=>{res.status(500).json(err)})
  }).catch((err)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json')
    res.json({response:"not authorized but posts will be added"})
  })
  })


// router.put('/:id',authenticate.verifyUser,async(req,res)=>{
//     try{
//         const post= await Post.findById(res.params.id);
//         if(post.userId == req.user.username){
//             await post.updateOne({$set:req.body})
//             res.status(200).json('the post has been updated')
//         }else{
//             res.status(403).json('you can update only your posts')
//         }
//     } catch(err){
//         res.status(500).json(err);
//     }
// })

// router.delete('/:id',authenticate.verifyUser, async (req,res)=>{
//     try{
//         console.log("del")
//         const post = await Post.findById(req.params.id)
//         console.log(post)
//         if (post.userId == req.user._id)
//         {
//             await post.deleteOne();
//             res.status(200).json('post has been deleted')
//         }else{
//             res.status(403).json('you can delete only your posts')
//         }
//     } catch(err){
//         res.status(500).json(err)
//     }
// })
router.route('/:id')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.delete(cors.corsWithOptions,(req, res) => {
  authenticate(req.headers.authorization).then((userid)=>{
    User.findOne({userId:userid}).then((user)=>{
        // user.posts.splice(user.posts.indexOf(user.posts[req.params.id]),1)
        user.posts.splice(user.posts.indexOf(user.posts.id(req.params.id)),1)
        user.save().then((saved)=>res.status(200).json(saved))
          })
  }).catch((err)=>{
    res.statusCode = 401;
    res.setHeader('Content-Type','application/json')
    res.json(err)

  })
})


router.route('/:id/posts')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.corsWithOptions,(req, res) => {
  authenticate(req.headers.authorization).then((userid)=>{
    User.findOne({userId:req.params.id}).then((user)=>{
      const posts = user.posts;
      const pageCount = Math.ceil(posts.length / 5);
      let page = parseInt(req.query.p);
      if (!page) page = 1;

        const output= (page > pageCount)?[]:posts.slice(page*5-5,page*5)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json({posts:posts,pages:pageCount})
        // res.statusCode = 200;
        // res.setHeader('Content-Type','application/json')
        // res.json(posts)
      })
  }).catch((err)=>{
    res.statusCode = 401;
    res.setHeader('Content-Type','application/json')
    res.json(err)
  })
})

router.route('/:userId/:id/like')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.put(cors.corsWithOptions,(req, res) => {
  authenticate(req.headers.authorization).then((userid)=>{
    User.findOne({userId:req.params.userId}).then((user)=>{

        if((user.posts.id(req.params.id).likes).indexOf(userid)===-1)
        user.posts.id(req.params.id).likes.push(userid)
        else
        user.posts.id(req.params.id).likes.splice(user.posts.id(req.params.id).likes.indexOf(userid),1)
        // user.posts[req.params.id].likes.push(userid)    
        // user.posts.findOne({_id:req.params.id}).then((us)=>console.log(us))
        // user.posts[req.params.id].likes.splice(user.posts[req.params.id].likes.indexOf(userid),1)
        user.save()
          })

  }).catch((err)=>{
    res.statusCode = 401;
    res.setHeader('Content-Type','application/json')
    res.json(err)
  })
    // try {
    //   const post = Post.findById(req.params.id);
    //   if (!post.likes.includes(req.user.username)) {
    //     await post.updateOne({ $push: { likes: req.user.username } });
    //     res.status(200).json("The post has been liked");
    //   } else {
    //     await post.updateOne({ $pull: { likes: req.user.username } });
    //     res.status(200).json("The post has been disliked");
    //   }
    // } catch (err) {
    //   res.status(500).json(err);
    // }
})

router.route('/:id/:postid/comment')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.post(cors.cors,async (req,res)=>{
        authenticate(req.headers.authorization).then((userid)=>{
            User.findOne({userId:req.params.id})
            .then((user)=>{
                console.log(user.posts)
                user.posts.id(req.params.postid).comments.push(
                  {userId:userid,
                  comment:req.body.comment,
                  profilePicture:req.body.profilePicture,
                  username:req.body.username,
                })
                user.save().then(()=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.json({message:'success'})
                })
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

router.route('/:id/:postid/comment/:commentid')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.delete(cors.cors,async (req,res)=>{
        authenticate(req.headers.authorization).then((userid)=>{
            User.findOne({userId:req.params.id})
            .then((user)=>{  
                if(userid==user.userId||userid===user.posts.id(req.params.postid).comments.id(req.params.commentid).userId)
                {
                user.posts.id(req.params.postid).comments.splice(user.posts.id(req.params.postid).comments.indexOf(user.posts.id(req.params.postid).comments.id(req.params.commentid)),1)
                user.save().then(()=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.json({message:'successfully deleted'})
                })}
                else{
                    res.statusCode = 401;
                    res.setHeader('Content-Type','application/json')
                    res.json({err})
                }
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

router.route('/:id/:postid/comment/:commentid/like')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.put(cors.cors,async (req,res)=>{
        authenticate(req.headers.authorization).then((userid)=>{
            User.findOne({userId:req.params.id})
            .then((user)=>{

                user.posts.id(req.params.id).comments.id(req.params.commentid).likes = user.posts.id(req.params.id).comments.id(req.params.commentid).likes +1;
                user.save().then(()=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json')
                    res.json({message:'successfully deleted'})
                })
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


// router.route('/:id')
// .options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
// .get(cors.cors, async (req, res) => {
//     try {
//       const post = await Post.find({userId:req.params.id});
//       res.status(200).json(post);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router.get("all/:id",authenticate.verifyUser,(req, res) => {
//   console.log(req.params['id'])
//     try {
//       const post = Post.find({});
//       res.status(200).json(post);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  module.exports = router;