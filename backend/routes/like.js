const express = require("express");
const multer = require("multer");
// const like = require("../models/like")
const Post = require("../models/post");
const Like = require("../models/like");
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
// router.post("/comment",(req,res,next)=>{
//   const comment = new Comment({
//     username : req.body.username,
//     comment : req.body.comment,
//     postId : req.body.postId,
//   })
router.post("/:postId",(req,res,next)=>{
  const like = new Like({
    // username : req.body.username,
    // comment : req.body.comment,
    postId : req.params.postId,
    likedby : req.body.username
  })
  // console.log(like)
  like.save().then(createdLike=>{
    // if (err) throw err
      // res.status(200).json(createdComment)
     try{
      res.status(201).json({message :'createdLike',likedby:createdLike})
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
router.get("",(req,res,next)=>{
  try{
    let fetchedLikes
    // const postId=req.params.postId
    // console.log(postId)
    const likeQuery=Like.find()
    likeQuery.then((data)=>{
      // console.log(data)
      fetchedLikes=data
      return Like.count
    }).then((count)=>{
      res.status(200).json({
        message:"likes parsed successfully",
        likes:fetchedLikes,
        maxLikes:count
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
