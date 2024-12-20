const {getuser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        const userUid = req.cookies?.uid;

        if (!userUid) {
            return res.status(401).json({ success: false, message: "User not logged in" });
        }

        const user = getuser(userUid);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid user" });
        }

        req.user = user;
        console.log("User authenticated:", req.user._id);
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(500).json({ success: false, message: "Server error during authentication" });
    }
}


module.exports={
    restrictToLoggedinUserOnly,
}
