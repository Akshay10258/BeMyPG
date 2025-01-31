// const {getuser}=require("../service/auth2");



// async function restrictToLoggedinPgUserOnly(req,res,next){
//     const userUid=req.cookies?.uid; // ? if u get error as properties of undefined pointing on req.cookie.....
//     if(!userUid)
//         return res.json({ success: true, redirect: "https://be-my-pg.vercel.app/UserLogin" });
//     console.log("restrict",userUid);
//     const user=getuser(userUid);
  

//     if(!user) 
//         return res.json({ success: true, redirect: "https://be-my-pg.vercel.app/UserLogin" });
//     req.user=user;
//     console.log(req.user._id);
//     console.log("got the id ")
//     next();

// }

// module.exports={
//     // restrictToLoggedinUserOnly,
//     restrictToLoggedinPgUserOnly,
// }
const { getuser } = require("../service/auth2");

async function restrictToLoggedinPgUserOnly(req, res, next) {
    try {
        console.log("Incoming cookies:", req.cookies); // Log cookies for debugging

        const userUid = req.cookies?.uid; // Check if uid is present in cookies
        if (!userUid) {
            console.warn("No UID found in cookies.");
            return res.status(401).json({ success: false, redirect: "https://be-my-pg.vercel.app/UserLogin" });
        }

        const user = await getuser(userUid); // Ensure getuser is async and returns user
        if (!user) {
            console.warn("No user found for UID:", userUid);
            return res.status(401).json({ success: false, redirect: "https://be-my-pg.vercel.app/UserLogin" });
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
    restrictToLoggedinPgUserOnly,
};
