const mongoose=require('mongoose');

const commentSchema = mongoose.Schema({
    // title:{type:String,required:true},
    id: {type:String, required:true},
    postId :{type:String,required : true},
    comment:{type:String,required:false},
    imagePath:{type:String,require:true}

});

module.exports=mongoose.model('Post',postSchema)