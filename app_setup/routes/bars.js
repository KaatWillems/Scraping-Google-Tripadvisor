const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const Bar = require("../models/bar").Bar

// const cloudinary = require("cloudinary");


router.post("/search", async (req, res) => {
    console.log("testtttttttt")
    console.log(req.body)
    if(!req.user.profile){

        bararr = []
  
        let bars = await Bar.find({addressCity: req.body.userquery})

        bars.forEach((bar) => {
          bararr.push({bar: bar, barrating: getStars(bar)})
        })
        console.log(bararr)
        // let trendingbars
        res.render('dashboard',{
          user: req.user,
          bars: bararr,
  
        });
    }
    // console.log(req.body, "from profiles.js brain")
    // const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
    // res.send({data: profiles})
   
  })

  router.get("/search", async (req, res) => {
    res.render('dashboard',{
        user: req.user,
        bars: [],

      });
    console.log("testtttttttt")
    // console.log(req.body, "from profiles.js brain")
    // const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
    // res.send({data: profiles})
   
  })



  module.exports  = router;