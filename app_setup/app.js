const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const fileupload = require('express-fileupload')

//passport config:
require('./config/passport')(passport)
//mongoose (connected with Set the bar)
mongoose.connect('mongodb+srv://Setthebar:Setthebar100@cluster0.pxj0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected with Setthebar DB'))
.catch((err)=> console.log(err));


//CLOUDINARY

cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });

// const storage = new CloudinaryStorage({
// cloudinary: cloudinary,
// folder: "diogface",
// allowedFormats: ["jpg", "png"],
// transformation: [{ width: 500, height: 500, crop: "limit" }]
// });
// const parser = multer({ storage: storage });

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
app.use(express.json())
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })

app.use(fileupload({useTempFiles: true}))
app.use("/static", express.static("public"));



//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/profiles',require('./routes/profiles'));
app.use('/bars',require('./routes/bars'));





app.listen(4000);
