const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://purva:purva123@cluster0.onuj2yr.mongodb.net/hivemind")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

<<<<<<< HEAD
    })
    // post.save()
    post.save().then((createdPost)=>{

      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id
      });
    })
    console.log(post);

 
  });
  
  app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    });
  });
  

  app.get("/api/posts", (req, res, next) => {
    // const posts = [
    //   {
    //     id: "fadf12421l",
    //     title: "First server-side post",
    //     content: "This is coming from the server"
    //   },
    //   {
    //     id: "ksajflaj132",
    //     title: "Second server-side post",
    //     content: "This is coming from the server!"
    //   }
    // ];
    Post.find().then(documents=>{
      res.status(200).json({
        message:'Posts fetch successfully',
        posts: documents
      
      })
    })
   
  });

  app.delete("/api/posts/:id", (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
      res.status(200).json({ message: "Post deleted!" });
    });
  });
  
  module.exports = app;
  
=======
module.exports = app;
>>>>>>> 1adf8e486ef1a3501829ccd195ac1d596f6140e1
