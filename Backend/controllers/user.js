const User=require("../models/pguser");
const {v4:uuidv4}=require("uuid");
const {setuser}=require("../service/auth2")
const client_URL = process.env.client_URL 
async function signup(req,res) {
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    console.log("Signed in")
    return res.json({ success: true, redirect: `${client_URL}/UserLogin` });
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid email or password" 
        });
    }
    
    const token = setuser(user);
    
    // Determine environment-specific cookie settings
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("uid", token, {
        httpOnly: true,
        secure: isProduction, // Use secure cookies in production only
        sameSite: isProduction ? "None" : "Lax", // "None" for cross-site in production, "Lax" for development
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    
    return res.json({ 
        success: true, 
        message: "Login successful",
        user: { name: user.name, email: user.email }
    });
}

module.exports={
    signup,
    login,
}

