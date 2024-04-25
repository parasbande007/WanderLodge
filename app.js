if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require("express");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate  = require("ejs-mate");
const ExpressError = require("./util/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const reviewRouter = require("./routes/review.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const mongoose = require('mongoose');
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));
app.engine("ejs", ejsMate);

const dbUrl =  process.env.ATLASDB_URL;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
}
  
  

// app.get("/",(req,res)=>{
//     res.send("root server");
// });


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
});

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

app.use(session({
    store,
    secret: process.env.SECRET,
    resave :false,
    saveUninitialized : true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
    }
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async (req,res)=>{
//     let fakeUser = new User({
//         email : "parasbande@gmail.com",
//         username: "paras_03",
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });




app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "My new Villa",
//         desciption : "By the beach",
//         price : 1200,
//         location : "Calangute, Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     res.send("successful");
// });







app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next)=>{
    let {statusCode =500, message="Something went wrong!"}= err;
    res.status(statusCode).render("error.ejs", {message});
});



// app.use((err, req, res, next)=>{
//     //console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

app.listen(8080, ()=>{
    console.log("app is listening on 8080");
});


