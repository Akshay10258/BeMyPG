const pgModel = require("../models/AddPGdetails");
const mongoose = require("mongoose");
const cors = require('cors'); // CORS is still needed for cross-origin requests
const client_URL = process.env.client_URL 
const uri = process.env.MONGO_URL;
const conn = mongoose.createConnection(uri);

// CORS configuration
const corsOptions = {
    origin: `${client_URL}`, // Your frontend domain
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Wait for the MongoDB connection
conn.once("open", () => {
    console.log("MongoDB connected!");
});

// Controller function for adding a new room
const AddNewRoom = async (req, res) => {
    // Apply CORS
    cors(corsOptions)(req, res, async () => {
        // Validate request body
        console.log("herehere",req.body)
        if (!req.body.occupancy || !req.body.Roomprice || !req.body.VacantRooms) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "User not authenticated" });
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
        const ownerId = req.user._id;

        try {
            // Update PG details without image upload
            const result = await pgModel.updateOne(
                { createdBy: ownerId },
                {
                    $set: {
                        [`Rooms.${num}.RoomPrice`]: body.Roomprice,
                        [`Rooms.${num}.VacantRooms`]: body.VacantRooms,
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
};

module.exports = { AddNewRoom };
