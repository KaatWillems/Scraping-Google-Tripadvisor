const mongoose = require('mongoose');

const BarSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  addressCity :{
    type  : String,
    required : true
  } ,
  addressStreet: {
    type  : String,
    required : true
  },
  addressNumber: {
    type  : String,   // I put string because sometimes the housenumber can contain letters 
    required : true
  },
  siteUrl: {
    type  : String,
  },
  schedule: {
    type  : String,
  },
  pictureUrl: {
    type  : String,
  },
  ratings: {
    type  : Number,
  },
  reviews : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

const Bar = mongoose.model('Bar',BarSchema);

module.exports = {Bar, BarSchema};
<<<<<<< HEAD
=======

>>>>>>> 23e5373a46e4af15cb37d54c05ed533dcc91ce05
