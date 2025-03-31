const User=require("../models/pgowner");
const {v4:uuidv4}=require("uuid");
const {setuser}=require("../service/auth")
const client_URL = process.env.client_URL 
async function signup(req,res) {
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.json({ success: true, redirect: `${client_URL}/OwnerLogin` });
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.status(401).send("Invalid email or password"); // Use status codes for errors
    }

    console.log("success");   
    console.log(user);
    const token= setuser(user);

    console.log("toktotk",token);
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("uid", token, {
        httpOnly: true,
        secure: isProduction, // Use secure cookies in production only
        sameSite: isProduction ? "None" : "Lax", // "None" for cross-site in production, "Lax" for development
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    
    return res.json({ success: true, redirect: `${client_URL}/OwnerLogin` });
}


module.exports={
    signup,
    login,
}