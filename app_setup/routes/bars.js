const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")
// const cloudinary = require("cloudinary");


router.post("/bars/search", async ())