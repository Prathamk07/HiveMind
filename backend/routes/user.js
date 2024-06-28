const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserToken=require('../models/UserToken')
const User = require("../models/user");
const Follower = require("../models/follower");
const cookies = require('cookie-parser')
const router = express.Router();
const nodemailer=require('nodemailer')
const multer = require("multer");
const user = require("../models/user");

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

router.use(cookies())
let resetToken=''
let userToken = ''
router.post(
  "/signup", 
  // multer({ storage: storage }).single("image"),
  (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username : req.body.username,
      dob : req.body.dob,
      fullname : req.body.fullname,
      emailverified : req.body.emailverified,
      // imagePath: url + "/images/" + req.file.filename,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.get('/profile/:username?/:currentUsername?',async (req,res,next)=>{
  const username=req.params.username
  const currentUsername=req.params.currentUsername
  console.log(username,currentUsername)
  if(username){

    console.log('username : ',username)
    const user=await User.findOne({username})
    const isFollowed = await Follower.findOne({followedTo: username,followedBy:currentUsername})
    console.log('user :',user)
    const userData = {
      id : user._id,
      email : user.email,
      username : user.username,
      dob : user.dob,
      fullname : user.fullname,
      emailverified : user.emailverified,
      bio : user.bio,
      imagePath : user.imagePath,
      followers : user.followers?user.followers:0,
      following: isFollowed?true:false  
    }
    res.status(200).json({message : 'Fetched User Profile', user : userData })
  }
  else{

    decryptedToken=jwt.verify(userToken,"secret_this_should_be_longer",(err,userData)=>{
      if (err) throw err
      console.log("User fetched" , userData)
      res.json({message: "User Fetched",
        user:{
          id : userData.userId,
          username : userData.username,
          dob : userData.dob,
          fullname : userData.fullname,
          emailverified : userData.emailverified,
          email : userData.email,
          bio : userData.bio,
          imagePath : userData.imagePath,
          followers : userData.followers
        }
      })
    })
  }
})    

router.get('/allusers',async (req,res,next)=>{
  const users=await User.find()
  res.status(200).json({message : 'Fetched All Users', users : users})
  //res.json({message:"all User fatched", users: users})
})

router.post('/forgotpassword',async (req,res,next)=>{
  const email = req.body.email;
  const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
  if (!user)
  {
      return next(CreateError(404, "User not found to rest the email!"))
  }
  const payload = {
      email: user.email
  }
  const expiryTime = 300;
  const token = jwt.sign(payload, 'this_is_secret_key', { expiresIn: expiryTime });
  resetToken=token
  const newToken = new UserToken({
      userId: user._id,
      token: token
  });

  const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: 'lunatieempire418@gmail.com',
          pass: 'cxdd mvwf kyvr lkag'
      }
  });
  let mailDetails = {
      from: "your email",
      to: email,
      subject: "Reset Password!",
      html: `

<h1>Password Reset Request</h1>
<p>Dear ${user.username},</p>
<p>We have received a request to reset your password for your account with BookMYBook. To complete the password reset process, please click on the button below:</p>
<a href=http://localhost:4200/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none;
   cursor: pointer; border-radius: 4px;">Reset Password</button></a>
<p>Please note that this link is only valid for a 5mins. If you did not request a password reset, please disregard this message.</p>
<p>Thank you,</p>
<p>Let's Program Team</p>

`,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) =>
  {
      if (err)
      {
          throw err
          // return next(CreateError(500, "Something went wrong while sending the email"))
      } else
      {
          await newToken.save();
          // return next(CreateSuccess(200, "Email Sent Successfully!"))
          res.status(200).json(token)
      }
  })
})
 
router.put('/reset/:token',async(req,res,next)=>{
  const token=req.params.token
  const password=req.body.password;
  console.log(token)
  jwt.verify(token,'this_is_secret_key',async(err,data)=>{
    if (err) throw err
    const user = await User.findOne({ email: { $regex: '^' + data.email + '$', $options: 'i' } });
    if (!user)
    {
        res.status(404).json("User not found to rest the email!")
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
            user.password = encryptedPassword;
            try
            {
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true }
              )
              console.log(updatedUser)
              res.status(200).json('Password reset successfull')
            } catch (error)
            { 
              throw error
              // res.status(500).json(error)
            }
          })

}
)
router.post("/login", (req, res, next) => {
  let fetchedUser;
  //mach email with signin time email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        //user is not exist
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      //compiar password hash to signin time password hash
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      userToken = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id ,fullname : fetchedUser.fullname,dob : fetchedUser.dob,username:fetchedUser.username,emailverified:fetchedUser.emailverified},"secret_this_should_be_longer");
      console.log(userToken);
      // res.cookie('cookie',userToken)
      res.status(200).json({
        token: userToken,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.put(
  '/updateuser/:userId',
  multer({ storage: storage }).single("image"),
  async (req,res,next)=>{
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
  const updateUser={
    username : req.body.username,
    dob :  req.body.dob,
    fullname : req.body.fullname,
    bio : req.body.bio,
    imagePath : imagePath
  }
  
  const user = await User.findOneAndUpdate({_id : req.params.userId},updateUser)


  res.json({message:'user updated successfully',response :{
    id : user._id,
    username : user.username,
    fullname : user.fullname,
    dob : user.dob,
    bio : user.bio,
    imagePath : user.imagePath,
    email : user.email,
    emailverified : user.emailverified
  }})

})

router.put('/follow/:followUser',async(req,res,next)=>{
  const followUser=req.params.followUser
  console.log(req.body.username)
  const user=await User.findOne({username : followUser})
  let followers = (user.followers?user.followers:1)
  followers++
  const updatedUser=await User.findOneAndUpdate({username: followUser},{followers : followers})
  const registerFollow= new Follower({
    followedTo: followUser,
    followedBy : req.body.username
  })
  registerFollow.save()
  .then(()=>{

    res.json({user : {
      _id: updatedUser._id,
      email: updatedUser.email,
      dob : updatedUser.dob,
      fullname : updatedUser.fullname,
      username : updatedUser.username,
      followers : updatedUser.followers,
      following : true
    }, follow : registerFollow})
  })
})

router.put('/unfollow/:followUser',async(req,res,next)=>{
  const followUser=req.params.followUser
  console.log(req.body.username)
  const user=await User.findOne({username : followUser})
  let followers = (user.followers?user.followers:1)
  followers--
  const updatedUser=await User.findOneAndUpdate({username: followUser},{followers : followers})
  const deleteFollow=await Follower.deleteOne({followedBy : req.body.username, followedTo : followUser})
  res.json({user : {
    _id: updatedUser._id,
    email: updatedUser.email,
    dob : updatedUser.dob,
    fullname : updatedUser.fullname,
    username : updatedUser.username,
    followers : updatedUser.followers,
    following : false
  },delete : deleteFollow})
  
  
})

module.exports = router;
