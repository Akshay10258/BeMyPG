const userModel = require("../models/pguser");

const logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("uid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        });
        
        console.log("cookie cleared");
        // Send success response
        res.status(200).json({ 
            success: true, 
            message: "Logout successful" 
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Logout failed" 
        });
    }
};

module.exports = { logout };