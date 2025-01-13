// // const pgModel =require("../models/AddPGdetails")
// // const multer = require("multer"); 
// // const path = require('path');

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null,path.join(__dirname, 'uploads')); // Folder to save uploaded files
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + "-" + file.originalname); // Unique filename
// //     }
// // });

// // const upload = multer({ storage: storage });


// // const AddNewRoom =async (req,res) => {        
// //         // console.log(req.body.pgName);
// //         const body=req.body;
// //         const numObj={
// //             "single occupancy" : 0,
// //             "double occupancy" : 1,
// //             "triple occupancy" : 2,
// //         } 
// //         const num = numObj[body.occupancy]
// //         // const data = await pgModel.findOne({_id: '6727b380b7ed3dff4f3efd07'});
// //         // const reqObj=data.Rooms[num]

// //         // console.log("num" ,num)
// //         const result = await pgModel.updateOne(
// //             { _id: '6727b380b7ed3dff4f3efd07' },                         
// //             { 
// //                 $set: { 
// //                     [`Rooms.${num}.RoomPrice`]: body.Roomprice, // Update RoomPrice for the matched room
// //                     [`Rooms.${num}.VacantRooms`]: body.VacantRooms, // Update VacantRooms for the matched room
// //                     [`Rooms.${num}.Images`]: imagePath
// //                 }
// //             }
// //         );

// //         // console.log("Update Result:", result);
// //         console.log("Bosy",body)
// //         // console.log(body.Roomprice)
// //         res.send("Got the data")
// //     }

// // module.exports = {AddNewRoom};

// // const pgModel = require("../models/AddPGdetails");

// // const AddNewRoom = async (req, res) => {
// //     try {
// //         const body = req.body;
// //         const numObj = {
// //             "single occupancy": 0,
// //             "double occupancy": 1,
// //             "triple occupancy": 2,
// //         };
// //         const num = numObj[body.occupancy];

// //         // Collect the image paths from uploaded files
// //         const imagePaths = req.files ? req.files.map(file => file.path) : [];

// //         // Find the PG details by ID and update the room
// //         const result = await pgModel.updateOne(
// //             { _id: '6727b380b7ed3dff4f3efd07' },
// //             {
// //                 $set: {
// //                     [`Rooms.${num}.RoomPrice`]: body.Roomprice, // Update RoomPrice for the matched room
// //                     [`Rooms.${num}.VacantRooms`]: body.VacantRooms, // Update VacantRooms for the matched room
// //                 },
// //                 // You can append images to the room object or handle them in a different way
// //                 // $addToSet: { [`Rooms.${num}.images`]: { $each: imagePaths } }
// //             }
// //         );

// //         console.log("Update Result:", result);
// //         console.log(body);
// //         res.send("Got the data and updated successfully");
// //     } catch (error) {
// //         console.error("Error updating room:", error);
// //         res.status(500).send("Error updating room details");
// //     }
// // };

// // module.exports = { AddNewRoom };

// const pgModel = require("../models/AddPGdetails");
// const multer = require("multer");
// const path = require('path');

// const express = require('express');
// const app = express();
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads')); // Save to 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename
//     }
// });

// const upload = multer({ storage: storage });

// // Controller function for adding a new room
// const AddNewRoom = async (req, res) => {
//     // Handle file upload using multer's middleware
//     upload.array('images', 10)(req, res, async (err) => { // Limit to 10 images (or adjust as needed)
//         if (err) {
//             console.log('Multer error:', err);
//             return res.status(400).send('Error uploading file: ' + err.message);
//         }

//         // If no files uploaded
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).send('No images uploaded');
//         }

//         // Log the files for debugging
//         console.log('Files uploaded:', req.files);

//         const body = req.body;
//         const numObj = {
//             "single occupancy": 0,
//             "double occupancy": 1,
//             "triple occupancy": 2,
//         };
//         const num = numObj[body.occupancy];

//         // Prepare the image paths for the database
//         const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
//         const ownerId = req.user._id;
//         try {
//             const result = await pgModel.updateOne(
//                 {createdBy: ownerId}, // Replace with the actual PG ID
//                 {
//                     $set: {
//                         [`Rooms.${num}.RoomPrice`]: body.Roomprice,
//                         [`Rooms.${num}.VacantRooms`]: body.VacantRooms,
//                         [`Rooms.${num}.Images`]: imagePaths,
//                     }
//                 }
//             );

//             console.log("Update Result:", result);
//             res.send("Room details added with image paths");
//         } catch (error) {
//             console.error("Error updating room:", error);
//             res.status(500).send("Error updating room details");
//         }
//     });
// };

// module.exports = { AddNewRoom };

// const pgModel =require("../models/AddPGdetails")
// const mongoose = require("mongoose");
// const multer = require("multer");
// const { GridFsStorage } = require('multer-gridfs-storage'); // Changed this line
// const { GridFSBucket } = require("mongodb");

// const uri = "mongodb+srv://dbBeMyPGAkshay:akshay1234@cluster0.mjpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const conn = mongoose.createConnection(uri);

// // Wait for the MongoDB connection
// conn.once("open", () => {
//     console.log("MongoDB connected for file storage!");
// });

// // Configure GridFS Storage
// const storage = new GridFsStorage({  // Changed from multerGridFSStorage to GridFsStorage
//     url: uri,
//     file: (req, file) => {
//         return {
//             bucketName: 'uploads',
//             filename: Date.now() + '-' + file.originalname,
//         };
//     },
// });

// const upload = multer({ storage });

// // Controller function for adding a new room
// const AddNewRoom = async (req, res) => {
//     // Use multer to handle file upload
//     upload.array("images", 10)(req, res, async (err) => {
//         if (err) {
//             console.log("Multer error:", err);
//             return res.status(400).json({ error: "Error uploading file: " + err.message });
//         }

//         // If no files uploaded
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ error: "No images uploaded" });
//         }

//         // Log the files for debugging
//         console.log("Files uploaded:", req.files);

//         const body = req.body;
//         const numObj = {
//             "single occupancy": 0,
//             "double occupancy": 1,
//             "triple occupancy": 2,
//         };
//         const num = numObj[body.occupancy];

//         // Store file info from GridFS
//         const imagePaths = req.files.map(file => file.id); // Changed to store GridFS file IDs

//         const ownerId = req.user._id;

//         try {
//             const result = await pgModel.updateOne(
//                 { createdBy: ownerId },
//                 {
//                     $set: {
//                         [`Rooms.${num}.RoomPrice`]: body.Roomprice,
//                         [`Rooms.${num}.VacantRooms`]: body.VacantRooms,
//                         [`Rooms.${num}.Images`]: imagePaths,
//                     }
//                 }
//             );

//             console.log("Update Result:", result);
//             res.json({ message: "Room details added successfully", imageIds: imagePaths });
//         } catch (error) {
//             console.error("Error updating room:", error);
//             res.status(500).json({ error: "Error updating room details" });
//         }
//     });
// };

// module.exports = { AddNewRoom };

const pgModel = require("../models/AddPGdetails");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket } = require("mongodb");
const cors = require('cors'); // Add this

const uri = "mongodb+srv://dbBeMyPGAkshay:akshay1234@cluster0.mjpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const conn = mongoose.createConnection(uri);

// CORS configuration
const corsOptions = {
    origin: 'https://be-my-pg.vercel.app', // Your frontend domain
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Wait for the MongoDB connection
conn.once("open", () => {
    console.log("MongoDB connected for file storage!");
});

// Configure GridFS Storage with error handling
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        // Add file type validation
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return Promise.reject(new Error('Invalid file type'));
        }

        return {
            bucketName: 'uploads',
            filename: Date.now() + '-' + file.originalname,
            metadata: {
                originalName: file.originalname,
                uploadDate: new Date()
            }
        };
    }
});

// Configure multer with file size limit
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 // Maximum 10 files
    }
});

// Controller function for adding a new room
const AddNewRoom = async (req, res) => {
    // Apply CORS
    cors(corsOptions)(req, res, async () => {
        // Use multer to handle file upload
        upload.array("images", 10)(req, res, async (err) => {
            if (err) {
                console.log("Multer error:", err);
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: "File size too large. Maximum size is 5MB" });
                }
                if (err.code === 'LIMIT_FILE_COUNT') {
                    return res.status(400).json({ error: "Too many files. Maximum is 10 files" });
                }
                return res.status(400).json({ error: "Error uploading file: " + err.message });
            }

            // Validate request
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: "No images uploaded" });
            }

            if (!req.user || !req.user._id) {
                return res.status(401).json({ error: "User not authenticated" });
            }

            if (!req.body.occupancy || !req.body.Roomprice || !req.body.VacantRooms) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const body = req.body;
            const numObj = {
                "single occupancy": 0,
                "double occupancy": 1,
                "triple occupancy": 2,
            };

            if (!(body.occupancy in numObj)) {
                return res.status(400).json({ error: "Invalid occupancy type" });
            }

            const num = numObj[body.occupancy];
            const imagePaths = req.files.map(file => file.id);
            const ownerId = req.user._id;

            try {
                const result = await pgModel.updateOne(
                    { createdBy: ownerId },
                    {
                        $set: {
                            [`Rooms.${num}.RoomPrice`]: body.Roomprice,
                            [`Rooms.${num}.VacantRooms`]: body.VacantRooms,
                            [`Rooms.${num}.Images`]: imagePaths,
                        }
                    }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "No PG found for this owner" });
                }

                if (result.modifiedCount === 0) {
                    return res.status(400).json({ error: "No changes were made" });
                }

                console.log("Update Result:", result);
                res.status(200).json({
                    message: "Room details added successfully",
                    imageIds: imagePaths,
                    updateResult: result
                });
            } catch (error) {
                console.error("Error updating room:", error);
                res.status(500).json({
                    error: "Error updating room details",
                    details: error.message
                });
            }
        });
    });
};

module.exports = { AddNewRoom };