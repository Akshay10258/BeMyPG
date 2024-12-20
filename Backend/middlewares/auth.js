// const {getuser}=require("../service/auth");

// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid=req.cookies?.uid; // ? if u get error as properties of undefined pointing on req.cookie.....
//     console.log("ididid",userUid);
//     if(!userUid)
//         return res.json({ success: true });
//     const user=getuser(userUid);

//     if(!user) 
//         return res.json({ success: true});
//     req.user=user;
//     console.log(req.user._id);
//     console.log("got the id ")
//     next();

// }

// module.exports={
//     restrictToLoggedinUserOnly,
// }
const { getuser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        console.log("Incoming cookies:", req.cookies); // Log cookies for debugging

        const userUid = req.cookies?.uid; // Check if uid is present in cookies
        if (!userUid) {
            console.warn("No UID found in cookies.");
            return res.status(401).json({ success: false, redirect: "https://be-my-pg.vercel.app/OwnerLogin" });
        }

        const user = await getuser(userUid); // Ensure getuser is async and returns user
        if (!user) {
            console.warn("No user found for UID:", userUid);
            return res.status(401).json({ success: false, redirect: "https://be-my-pg.vercel.app/OwnerLogin" });
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
