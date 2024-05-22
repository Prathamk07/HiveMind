const mongoose=require('mongoose');

const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    caption:{type:String,required:true},
    imagePath:{type:String,require:true}

});

module.exports=mongoose.model('Post',postSchema)