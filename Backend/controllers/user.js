const User=require("../models/pguser");
const {v4:uuidv4}=require("uuid");
const {setuser}=require("../service/auth2")

async function signup(req,res) {
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    console.log("Signed in")
    return res.json({ success: true, redirect: "https://be-my-pg.vercel.app/UserLogin" });
}


async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.status(401).send("Invalid email or password"); // Use status codes for errors
    }

    console.log("success");
    console.log(user);
    // const sessionid=uuidv4();
    // setuser(sessionid,user);
    const token= setuser(user);
    console.log(token);
    res.cookie("uid", token, {
        httpOnly: true,  // Prevent access to cookies via JavaScript
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "None",  // Required for cross-origin requests
        maxAge: 1000 * 60 * 60 * 24,  // Cookie expiration time (1 day)
    });
    // res.cookie("uid",token);
   //res.cookie('uid',sessionid);
    // Instead of redirecting, send a JSON response indicating success
    return res.json({ success: true, redirect: "https://be-my-pg.vercel.app/UserLogin" });
}

module.exports={
    signup,
    login,
}

