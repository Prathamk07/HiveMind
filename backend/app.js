const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require("./models/post");
const app = express();

//device/google/cuttlefish_prebuilts

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://rex07:rex442525@cluster0.onuj2yr.mongodb.net/hivemind?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log('database connected')},err=>{console.log(err)})
// app.use('',()=>{
// mongoose.connect('').then(()=>{
//     console.log('database connected')

// })
// }),err=>{console.log(err)};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title:req.body.title,
      caption:req.body.content

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
  