const { getuser } = require("../service/auth");
const client_URL = process.env.client_URL 
async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        console.log("Incoming cookies:", req.cookies); // Log cookies for debugging

        const userUid = req.cookies?.uid; // Check if uid is present in cookies
        if (!userUid) {
            console.warn("No UID found in cookies.");
            return res.json(null);
        }

        const user = await getuser(userUid); // Ensure getuser is async and returns user
        if (!user) {
            console.warn("No user found for UID:", userUid);
            return res.status(401).json({ success: false, redirect: `${client_URL}/OwnerLogin` });
        }

        req.user = user; // Attach user to request
        console.log("Authenticated user:", req.user);
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = {
    restrictToLoggedinUserOnly,
};
