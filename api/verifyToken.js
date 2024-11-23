const jwt = require("jsonwebtoken")

function verify(req, res,next ) {
const authHeader = req.header.token;
if(authHeader){
const token = authHeader.split(" ")[1];

jwt.verify(token , process.env.SECRET_KEY, (err,user)=>{
    if(err) res.status(401).json("Token is not vaild")
        req.user = user;
    next()
})
}
else
return res.status(401).json("you are not authenticated")
}

module.exports = verify;s