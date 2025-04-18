// const express = require('express');
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path = require('path');
// const cookieParser = require("cookie-parser");
// const { GridFSBucket } = require('mongodb');
// const { connectomongodb } = require("./connect");

// const app = express();

// // CORS configuration - should be first
// app.use(cors({
//   origin: ['https://be-my-pg.vercel.app', 'https://be-my-pg-77p4.vercel.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Added OPTIONS
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],  // Added X-Requested-With
//   exposedHeaders: ['Set-Cookie']  // Fixed capitalization
// }));

// // Pre-flight requests
// app.options('*', cors());

// // Middleware setup - remove duplicates
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // CORS headers middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// // Logging middleware
// app.use((req, res, next) => {
//   console.log('Incoming request:', req.method, req.url);
//   console.log('Cookies:', req.cookies);
//   console.log('Origin:', req.headers.origin);
  
//   res.on('finish', () => {
//     console.log('Response headers:', res.getHeaders());
//   });
//   next();
// });

// const port = 3000;
// const {restrictToLoggedinUserOnly}=require("./middlewares/auth");
// const {restrictToLoggedinPgUserOnly}=require("./middlewares/auth2");


// connectomongodb("mongodb+srv://dbBeMyPGAkshay:akshay1234@cluster0.mjpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("Mongodb connected"))
//   .catch(err => {
//     console.error("MongoDB connection failed: ", err);
//     process.exit(1); // Exit the process if DB connection fails
//   });

// // importing the routes : 
// const rating=require("./routes/Ratings");
// const AddNewPgRoute = require("./routes/AddPGdetails");
// const staticRoute=require("./routes/staticRouter");
// const pgowner=require("./routes/Pgowner");
// const pguser=require("./routes/Pguser");
// const AddNewRoomRoute = require("./routes/AddNewRoom");
// const ViewPgDetailsRoute = require("./routes/ViewPgDetails");
// const OwnerProfile = require("./routes/OwnerProfile.js");
// const UserProfile = require("./routes/UserProfile.js");
// const UserFindPgByCity = require("./routes/UserFindPgByCity.js");
// const GetPgByCity = require("./routes/GetPgByCity.js");
// const BookPg = require("./routes/BookPg.js");
// const ScheduleVisit = require("./routes/ScheduleVisit.js");
// const updateBookingStatus = require("./routes/updateBookingStatus.js");
// const userBookings = require("./routes/userBookings.js");
// const userScheduledVisits = require("./routes/userScheduledVisits.js");


// // Midleware for packages
// // app.use(cors())


// //const cors = require('cors');
// app.get("/",(req,res)=>{
//   res.json("Hello");
// })

// // Midllewares or routes 
// app.use("/AddNewPgOwner",restrictToLoggedinUserOnly,AddNewPgRoute)     // for filling the details
// app.use("/AddNewRoom",restrictToLoggedinUserOnly,AddNewRoomRoute)
// app.use("/ViewPgDetails",restrictToLoggedinUserOnly,ViewPgDetailsRoute)
// app.use("/OwnerProfile",restrictToLoggedinUserOnly,OwnerProfile)
// app.use("/UserProfile",restrictToLoggedinPgUserOnly,UserProfile)
// app.use("/UserFindPgByCity",restrictToLoggedinPgUserOnly,UserFindPgByCity)
// app.use("/GetPgByCity",restrictToLoggedinPgUserOnly,GetPgByCity) 
// app.use("/updateBookingStatus",restrictToLoggedinPgUserOnly,updateBookingStatus);
// app.use("/userBookings",restrictToLoggedinPgUserOnly,userBookings)
// app.use("/userScheduledVisits",restrictToLoggedinPgUserOnly,userScheduledVisits)

// app.use("/BookPg",restrictToLoggedinPgUserOnly,BookPg);
// app.use("/rating",restrictToLoggedinPgUserOnly,rating);
// app.use("/ScheduleVisit",restrictToLoggedinPgUserOnly,ScheduleVisit);

// app.use("/",staticRoute);
// app.use("/owner",pgowner);      // means if url with /owner then call this
// app.use("/user",pguser);
// // MongoDB connection : BeMyPg (Name of the database)
// // mongoose.connect("mongodb://localhost:27017/BeMyPg")
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error adeed', details: err.message });
// });

// // After all your other route handlers
// app.get("/uploads/:filename", (req, res) => {
//   const bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
//   const fileStream = bucket.openDownloadStreamByName(req.params.filename);
  
//   fileStream.pipe(res).on('error', (err) => {
//       res.status(500).send("Error retrieving file: " + err.message);
//   });
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require("cookie-parser");
const { GridFSBucket } = require('mongodb');
const { connectomongodb } = require("./connect");
const client_URL = process.env.client_URL; 
const server_URL = process.env.server_URL; 
const app = express();

// Create MongoDB connection
const conn = mongoose.createConnection("mongodb+srv://dbBeMyPGAkshay:akshay1234@cluster0.mjpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// CORS configuration 
app.use(cors({
  origin: ['https://be-my-pg.vercel.app', 'https://be-my-pg-77p4.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
 }));

// Pre-flight requests
app.options('*', cors());

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  console.log('Cookies:', req.cookies);
  console.log('Origin:', req.headers.origin);
  res.on('finish', () => {
    console.log('Response headers:', res.getHeaders());
  });
  next();
 });

const port = process.env.PORT || 3000;
const {restrictToLoggedinUserOnly} = require("./middlewares/auth");
const {restrictToLoggedinPgUserOnly} = require("./middlewares/auth2");

// Connect to MongoDB
connectomongodb("mongodb+srv://dbBeMyPGAkshay:akshay1234@cluster0.mjpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 .then(() => console.log("Mongodb connected"))
 .catch(err => {
   console.error("MongoDB connection failed: ", err);
   process.exit(1);
 });

// Importing routes
const rating = require("./routes/Ratings");
const AddNewPgRoute = require("./routes/AddPGdetails");
const staticRoute = require("./routes/staticRouter");
const pgowner = require("./routes/Pgowner");
const pguser = require("./routes/Pguser");
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
const logOut = require("./routes/logout.js");
const userScheduledVisits = require("./routes/userScheduledVisits.js");

// Basic route
app.get("/", (req, res) => {
  res.json("Hello");
});

// Routes with middleware
app.use("/AddNewPgOwner", restrictToLoggedinUserOnly, AddNewPgRoute);
app.use("/AddNewRoom", restrictToLoggedinUserOnly, AddNewRoomRoute);
app.use("/ViewPgDetails", restrictToLoggedinUserOnly, ViewPgDetailsRoute);
app.use("/OwnerProfile", restrictToLoggedinUserOnly, OwnerProfile);
app.use("/updateBookingStatus", restrictToLoggedinUserOnly, updateBookingStatus);

app.use("/UserProfile", restrictToLoggedinPgUserOnly, UserProfile);
app.use("/UserFindPgByCity", restrictToLoggedinPgUserOnly, UserFindPgByCity);
app.use("/GetPgByCity", restrictToLoggedinPgUserOnly, GetPgByCity);
app.use("/userBookings", restrictToLoggedinPgUserOnly, userBookings);
app.use("/userScheduledVisits", restrictToLoggedinPgUserOnly, userScheduledVisits);
app.use("/BookPg", restrictToLoggedinPgUserOnly, BookPg);
app.use("/rating", restrictToLoggedinPgUserOnly, rating);
app.use("/ScheduleVisit", restrictToLoggedinPgUserOnly, ScheduleVisit);
app.use("/logout", logOut);

app.use("/", staticRoute);
app.use("/owner", pgowner);
app.use("/user", pguser);

// File upload handler
app.get("/uploads/:filename", (req, res) => {
 if (!conn || !conn.db) {
   return res.status(500).send("Database connection not established");
 }
 const bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
 const fileStream = bucket.openDownloadStreamByName(req.params.filename);
 
 fileStream.pipe(res).on('error', (err) => {
   console.error("File stream error:", err);
   res.status(500).send("Error retrieving file: " + err.message);
 });
});

// Error handler
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.header('Access-Control-Allow-Origin', req.headers.origin);
 res.header('Access-Control-Allow-Credentials', 'true');
 res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});