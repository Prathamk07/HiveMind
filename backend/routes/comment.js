const express = require("express");
const multer = require("multer");
const Comment = require("../models/comment")
const Post = require("../models/post");
const comment = require("../models/comment");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("",(req,res,next)=>{
  const comment = new Comment({
    username : req.body.username,
    comment : req.body.comment,
    postId : req.body.postId,
  })
  comment.save().then(createdComment=>{
    // if (err) throw err
      // res.status(200).json(createdComment)
     try{
      res.status(201).json({message :'createdComment',response:createdComment})
     }catch(err){
      throw err
     }
  }
)
  
  // console.log(data)
  // res.json(data)
})
router.put("/:commentId",(req,res,next)=>{
  
})
router.get("/:postId",(req,res,next)=>{
  try{
    let fetchedComments
    const postId=req.params.postId
    console.log(postId)
    const commentQuery=comment.find({postId:postId})
    commentQuery.then((data)=>{
      console.log(data)
      fetchedComments=data
      return Comment.count
    }).then((count)=>{
      res.status(200).json({
        message:"comments parsed successfully",
        comment:fetchedComments,
        maxComment:count
      })
    })
    // fetchedComments=commentQuery.
    // res.json()
    // console.log(commentQuery)
  }
  catch(err){
    console.log(err)
  }
  // res.status(201).json('comment get request')
})

router.delete("/:id", (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id }).then(result => {
  //const commentId=req.params.commentId
  //Post.deleteOne({ _id: commentId }).then(result => {
    console.log(result);
    res.status(200).json({ message: "PostComment deleted!"});
  });
});

module.exports = router;
