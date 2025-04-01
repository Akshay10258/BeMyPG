const pgModel =require("../models/AddPGdetails")

const userScheduledVisits = async (req, res) => {
    console.log("newwwww",req.body) 
    try {
        // Extract email from the request body
        const { email } = req.body;
        // console.log(email)
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
    
        // Find the PG details associated with the user by matching the user object id
        const pgDetails = await pgModel.find({ "scheduledVisits.email": email });
        console.log("detttt",pgDetails)
    
        // Collect all bookings from all PGs for this user
        let allVisits = [];
        
        // Loop through each PG and extract the user's bookings
        if (pgDetails && pgDetails.length > 0) {
            pgDetails.forEach(pg => {
                // Filter bookings for the specific user
                const userVisitsInThisPg = pg.scheduledVisits.filter(booking => booking.email === email);
                
                // Add PG info to each booking for context
                const visitsWithPgInfo = userVisitsInThisPg.map(booking => ({
                    ...booking.toObject(), // Convert Mongoose document to plain object
                    pgName: pg.PGname,
                    pgAddress: pg.Address,
                    pgCity: pg.City
                }));
                
                // Add to the overall bookings array
                allVisits = [...allVisits, ...visitsWithPgInfo];
            });
        }
    
        // Return the bookings
        return res.status(200).json(allVisits || []);
    } catch (error) {
        console.error('Error fetching user bookings:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
module.exports = {userScheduledVisits};