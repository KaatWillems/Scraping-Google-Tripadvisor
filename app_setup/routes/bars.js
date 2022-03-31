const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")
const Bar = require("..models/bars").Bar;
// const cloudinary = require("cloudinary");

router.post("/search", async (req, res) => {
    console.log(req.body)
    const profiles = await Profile.find({"username": {$regex: req.body.user_input}})
    res.send({data: profiles})
  
  })