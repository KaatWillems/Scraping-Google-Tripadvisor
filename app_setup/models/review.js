const mongoose = require('mongoose');

<<<<<<< HEAD
=======
const ProfileSchema = require("./profile").ProfileSchema

>>>>>>> 23e5373a46e4af15cb37d54c05ed533dcc91ce05
const ReviewSchema  = new mongoose.Schema({
  rating :{
      type  : Number,
      required : true
  },
  crowd :{
      type  : Number,
      required : true
  },
  hygiene :{
    type  : Number,
    required : true
  },
  atmosphere :{
    type  : Number,
    required : true
  },
  safety :{
    type  : Number,
    required : true
  },
  comment :{
    type  : Number,
  },
  date :{
    type : Date,
    default : Date.now
  },
<<<<<<< HEAD
  bars : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bar"
    }
  ]
});
const Review = mongoose.model('Review',ReviewSchema);

module.exports = {Review, ReviewSchema};
=======
  profile: ProfileSchema 
});
const Review = mongoose.model('Review',ReviewSchema);

module.exports = {Review, ReviewSchema};
>>>>>>> 23e5373a46e4af15cb37d54c05ed533dcc91ce05
