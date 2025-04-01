const pgModel = require("../models/AddPGdetails")

const userBookings = async (req, res) => {
    console.log("newwwww", req.body)
    try {
        // Extract email from the request body
        const { email } = req.body;
        // console.log(email)
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
    
        // Find the PG details associated with the user by matching the user object id
        const pgDetails = await pgModel.find({ "pgBookings.email": email });
        console.log("detttt", pgDetails)
    
        // Collect all bookings from all PGs for this user
        let allBookings = [];
        
        // Loop through each PG and extract the user's bookings
        if (pgDetails && pgDetails.length > 0) {
            pgDetails.forEach(pg => {
                // Filter bookings for the specific user
                const userBookingsInThisPg = pg.pgBookings.filter(booking => booking.email === email);
                
                // Add PG info to each booking for context
                const bookingsWithPgInfo = userBookingsInThisPg.map(booking => ({
                    ...booking.toObject(), // Convert Mongoose document to plain object
                    pgName: pg.PGname,
                    pgAddress: pg.Address,
                    pgCity: pg.City
                }));
                
                // Add to the overall bookings array
                allBookings = [...allBookings, ...bookingsWithPgInfo];
            });
        }
    
        // Return the bookings
        return res.status(200).json(allBookings || []);
    } catch (error) {
        console.error('Error fetching user bookings:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { userBookings };