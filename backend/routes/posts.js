const express = require("express");
const multer = require("multer");
const Comment = require("../models/comment")
const Post = require("../models/post");
// const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
     error = null;
     }
     cb(error, "backend/images");
  },
   filename: (req, file, cb) => {
     const name = file.originalname
       .toLowerCase()
       .split(" ")
       .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
     cb(null, name + "-" + Date.now() + "." + ext);
   }
 });

router.post(
  "",
  // checkAuth,
   multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      // title: req.body.title,
      username : req.body.username,
      caption: req.body.content,
       imagePath: url + "/images/" + req.file.filename,
       likes: req.body.likes
    });
    // console.log
    post.save().then(createdPost => {
      console.log(createdPost)
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);

router.put(
  "/:id",
   multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      username: req.body.username,
      // title: req.body.title,
      caption: req.body.content,
       imagePath: imagePath
    });
    console.log(post);
    Post.findByIdAndUpdate(req.params.id, {
      caption: req.body.caption,
      imagePath: imagePath,
      username : req.body.username
      // salary: req.body.salary
    }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Update successful!", updatedpost : result });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count;
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});


  
//   comment.save().then(createdComment=>{
//     // if (err) throw err
//       // res.status(200).json(createdComment)
//      try{
//       res.status(201).json({message :'createdComment',response:createdComment})
//      }catch(err){
//       throw err
//      }
//   }
// )
  
//   // console.log(data)
//   // res.json(data)
// })

// router.get('/comment',(req,res,next)=>{
//   // try{

//   //   const commentQuery=Comment.find()
//   //   console.log(commentQuery)
//   // }
//   // catch(err){
//   //   console.log(err)
//   // }
//   res.status(201).json('comment get request')
// })

module.exports = router;
