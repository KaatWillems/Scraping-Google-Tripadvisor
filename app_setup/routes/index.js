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

function getStars(bar) { 
  let rating = bar.ratings;
  ratingarr = rating.split(',')
  console.log(ratingarr)
  starNbr = parseInt(ratingarr[0])
  console.log(starNbr)
  let finalArr = []
  for (let i = 0; i < starNbr; i++) {
    finalArr.push('*')
    
  }
  if(ratingarr[1]){
    finalArr.push("/")
  } else if (!starNbr[1] && starNbr < 5) {

    finalArr.push(" ")
    }


  return finalArr
}



router.get('/dashboard',ensureAuthenticated, async (req,res)=>{
    if(!req.user.profile){
      


      bararr = []

      let bars = await Bar.find()
      bars.forEach((bar) => {
        bararr.push({bar: bar, barrating: getStars(bar)})
      })
      console.log(bararr)
      // let trendingbars
      res.render('dashboard',{
        user: req.user,
        bars: bararr,

      });
    }else{
      renderDashboardWithPosts(req, res)

    }
})
module.exports = router;
