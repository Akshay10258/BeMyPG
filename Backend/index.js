const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

const { connectomongodb}=require("./connect")
const app = express()

app.use((req, res, next) => {
  console.log('Incoming request from:', req.headers.origin);
  next();
});

app.use(cors({
  origin: ['https://be-my-pg.vercel.app', 'https://be-my-pg-77p3.vercel.app'], // Add all your allowed domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));



const port = 3000
const cookieParser=require("cookie-parser");
const {restrictToLoggedinUserOnly}=require("./middlewares/auth");
const {restrictToLoggedinPgUserOnly}=require("./middlewares/auth2");


connectomongodb("mongodb+srv://dbBeMyPGAkshay:akshay1234@cluster0.mjpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Mongodb connected"))
  .catch(err => {
    console.error("MongoDB connection failed: ", err);
    process.exit(1); // Exit the process if DB connection fails
  });



// importing the routes : 
const rating=require("./routes/Ratings");
const AddNewPgRoute = require("./routes/AddPGdetails");
const staticRoute=require("./routes/staticRouter");
const pgowner=require("./routes/Pgowner");
const pguser=require("./routes/Pguser");
const AddNewRoomRoute = require("./routes/AddNewRoom");
const ViewPgDetailsRoute = require("./routes/ViewPgDetails");
const OwnerProfile = require("./routes/OwnerProfile.js");
const UserProfile = require("./routes/UserProfile.js");
const UserFindPgByCity = require("./routes/UserFindPgByCity.js");
const GetPgByCity = require("./routes/GetPgByCity.js");
const BookPg = require("./routes/BookPg.js");
const ScheduleVisit = require("./routes/ScheduleVisit.js");
const updateBookingStatus = require("./routes/updateBookingStatus.js");
const userBookings = require("./routes/userBookings.js");
const userScheduledVisits = require("./routes/userScheduledVisits.js");


// Midleware for packages
// app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

//const cors = require('cors');
app.get("/",(req,res)=>{
  res.json("Hello");
})





// Midllewares or routes 
app.use("/AddNewPgOwner",restrictToLoggedinUserOnly,AddNewPgRoute)     // for filling the details
app.use("/AddNewRoom",restrictToLoggedinUserOnly,AddNewRoomRoute)
app.use("/ViewPgDetails",restrictToLoggedinUserOnly,ViewPgDetailsRoute)
app.use("/OwnerProfile",restrictToLoggedinUserOnly,OwnerProfile)
app.use("/UserProfile",restrictToLoggedinPgUserOnly,UserProfile)
app.use("/UserFindPgByCity",restrictToLoggedinPgUserOnly,UserFindPgByCity)
app.use("/GetPgByCity",restrictToLoggedinPgUserOnly,GetPgByCity) 
app.use("/updateBookingStatus",restrictToLoggedinPgUserOnly,updateBookingStatus);
app.use("/userBookings",restrictToLoggedinPgUserOnly,userBookings)
app.use("/userScheduledVisits",restrictToLoggedinPgUserOnly,userScheduledVisits)

app.use("/BookPg",restrictToLoggedinPgUserOnly,BookPg);
app.use("/rating",restrictToLoggedinPgUserOnly,rating);
app.use("/ScheduleVisit",restrictToLoggedinPgUserOnly,ScheduleVisit);

app.use("/",staticRoute);
app.use("/api/owner",pgowner);      // means if url with /owner then call this
app.use("/api/user/",pguser);
// MongoDB connection : BeMyPg (Name of the database)
// mongoose.connect("mongodb://localhost:27017/BeMyPg")
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error adeed', details: err.message });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

