const express = require("express");
const multer = require("multer");
const Comment = require("../models/comment")
const Post = require("../models/post");
const comment = require("../models/comment");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();


// router.post(
//   "",
//   // checkAuth,
//    multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     const url = req.protocol + "://" + req.get("host");
//     const post = new Post({
//       // title: req.body.title,
//       username : req.body.username,
//       caption: req.body.content,
//        imagePath: url + "/images/" + req.file.filename
//     });
//     // console.log
//     post.save().then(createdPost => {
//       res.status(201).json({
//         message: "Post added successfully",
//         post: {
//           ...createdPost,
//           id: createdPost._id
//         }
//       });
//     });
//   }
// );

// router.put(
//   "/:id",
//    multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename;
//     }
//     const post = {
//       _id: req.body.id,
//       // title: req.body.title,
//       content: req.body.content,
//        imagePath: imagePath
//     }
//     console.log(post);
//     Post.updateOne({ _id: req.params.id }, post).then(result => {
//       res.status(200).json({ message: "Update successful!" });
//     });
//   }
// );

// router.get("", (req, res, next) => {
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const postQuery = Post.find();
//   let fetchedPosts;
//   if (pageSize && currentPage) {
//     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
//   postQuery
//     .then(documents => {
//       fetchedPosts = documents;
//       return Post.count;
//     })
//     .then(count => {
//       res.status(200).json({
//         message: "Posts fetched successfully!",
//         posts: fetchedPosts,
//         maxPosts: count
//       });
//     });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });

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

module.exports = router;
