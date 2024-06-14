    const mongoose=require('mongoose');

const likeSchema = mongoose.Schema({
    // title:{type:String,required:true},
    // id: {type:String, required:true},
    postId :{type:String,required : true},
    likedby:{type:String,required:false},
    // username:{type:String}
    // imagePath:{type:String,require:true}

});

module.exports=mongoose.model('Like',likeSchema)