const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId:{
      type:String
    },
    username: {
      type: String,
      required: true,
    },
    profilePicture:{
      type:String
    },
    caption: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    // comments:[CommentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const commentSchema = new Schema({
//     author:{
//         type: Schema.Types.ObjectId,
//         ref: 'user',
//         required: true
//     },
//     body: { type: String, required:true},
//     created: {type: Date, default:Date.now}
// });

// commentSchema.set('toJSON',{getters:true});
// commentSchema.options.toJSON.transform = (doc,ret)=>{
//     const obj = {...ret};
//     delete obj._id;
//     return obj;
// };

// const likeSchema = new Schema(
//     {
//         user: { type: Schema.Type.ObjectId, required: true },
//         vote: { type: Number, required: true }
//     },
//     { _id: false}
// );

// const postSchema = new Schema({
//     title: {type: String, required: true},
//     url: {type: String },
//     author: {
//         type: Schema.Type.ObjectId,
//         ref:'user',
//         required: true
//     },
//     type:{type:String,default:'text',required:true},
//     category: { type: String, required: true},
//     likes: [likeSchema],
//     comments: [commentSchema],
//     created: { type: Date, default: Date.now},
//     caption: { type:String}
// });

// postSchema.set('toJSON',{getters: true});
// postSchema.options.toJSON.transform = (doc,ret)=>
// {
//     const obj = {...ret},
//     delete obj._id;
//     delete obj.__v;
//     return obj;
// };

// postSchema.methods.addComment = function(author, body){
//     this.comments.push({author,body});
//     return this.save();
// }

// postSchema.methods.removeComment = function(id)
// {
//     const comment = this.comment.id(id);
//     if(!comment) throw new Error('Comment not found');
//     comment.remove();
//     return this.save();
// }

// module.exports = mongoose.model('post',postSchema);
