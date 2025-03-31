const jwt=require("jsonwebtoken")
const secret="Amogh$123"
function setuser(user)
{
    const payload={
        _id: user._id,
        email:user.email,
    };
    return jwt.sign(payload,secret);
}


function getuser(token)
{
    if(!token)return null;
    try{  
        console.log("getuser",token); 
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}

module.exports={
    setuser,
    getuser,
};