const {getuser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid=req.cookies?.uid; // ? if u get error as properties of undefined pointing on req.cookie.....
    console.log("ididid",userUid);
    if(!userUid)
        return res.json({ success: true });
    const user=getuser(userUid);

    if(!user) 
        return res.json({ success: true});
    req.user=user;
    console.log(req.user._id);
    console.log("got the id ")
    next();

}

module.exports={
    restrictToLoggedinUserOnly,
}
