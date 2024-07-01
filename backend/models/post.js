const mongoose=require('mongoose');

const postSchema = mongoose.Schema({
    // title:{type:String,required:true},
    username: {type:String, required:true},
    caption:{type:String,required:false},
    imagePath:{type:String,require:true},
    likes:{type:Number},

});

module.exports=mongoose.model('Post',postSchema)