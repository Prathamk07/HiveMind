const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const followerSchema = mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
  followedBy : String,
//   dob: String,
//   fullname : String,
//   emailverified : Boolean,
//   imagePath:{type:String,require:true},
//   bio:String,
//   followers : Number
followedTo : String

});

followerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Followers", followerSchema);
