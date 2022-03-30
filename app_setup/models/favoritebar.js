const mongoose = require('mongoose');

const FavoritebarSchema  = new mongoose.Schema({
  profile: ProfileSchema, //like in the user.js schema. but not sure if correct (kaat)
  bars : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bar"
    }
  ]
});
const Favoritebar = mongoose.model('Favoritebar', FavoritebarSchema);

module.exports = {Favoritebar, FavoritebarSchema};