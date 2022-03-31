const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth')
const Profile = require("../models/profile").Profile;
const Post = require("../models/post").Post
const Bar = require("../models/bar").Bar

//login page diogo 
// router.get('/', (req,res)=>{
//   Post.find({}, (err, allPosts) => {
//     res.render('welcome', {allposts: allPosts });
//   })
// })

//login page set the bar 
router.get('/', (req,res)=>{  
    res.render('welcome');  
})

//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

//diogo 
// const getProfileAndPopulate = function(id){
//   return Profile.findById(id).populate("posts")
// }

// const renderDashboardWithPosts = async function(req, res){
//   posts = await getProfileAndPopulate(req.user.profile._id)

//   res.render('dashboard',{
//       user: req.user,
//       posts: posts
//   });
// }



router.get('/dashboard',ensureAuthenticated, async (req,res)=>{
    if(!req.user.profile){
      let bars = await Bar.find()
      // let trendingbars
      console.log(bars)
      res.render('dashboard',{
        user: req.user,
        bars: bars,

      });
    }else{
      renderDashboardWithPosts(req, res)

    }
})
module.exports = router;
