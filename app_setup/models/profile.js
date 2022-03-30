const mongoose = require('mongoose');

const ProfileSchema  = new mongoose.Schema({
  username :{
      type  : String,
      required : true
  },
  profilePic :{
    type  : String,
  },
  requirementsForBars:{
    type  : String,
  },
  date :{  // not sure if we should keep this (kaat)
    type : Date,
    default : Date.now
  },
  favoritebars : [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "favoritebar"
=======
      ref: "bar"
>>>>>>> 23e5373a46e4af15cb37d54c05ed533dcc91ce05
    }
  ]
});
const Profile = mongoose.model('Profile',ProfileSchema);

module.exports = {Profile, ProfileSchema};
