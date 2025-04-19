const {getuser}=require("../service/auth2");

const client_URL = process.env.client_URL 

async function restrictToLoggedinPgUserOnly(req,res,next){
    const userUid=req.cookies?.uid; // ? if u get error as properties of undefined pointing on req.cookie.....
    console.log("enetred middleware")
    console.log("iddddd",userUid)
    console.log("cookd",req.cookies)
    if(!userUid)
        // return res.json({ success: true, redirect: `${client_URL}/UserLogin` });
        return res.json(null);
    // console.log("restrict",userUid);
    const user=getuser(userUid);


    if(!user) 
        return res.json({ success: false, redirect: `${client_URL}/UserLogin` });
    req.user=user;
    console.log(req.user._id);
    console.log("got the id ")
    next();

}

module.exports={
    restrictToLoggedinPgUserOnly,
}

