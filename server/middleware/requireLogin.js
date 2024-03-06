const jwt = require('jsonwebtoken');	// Importing JWT to verify the token
const {JWT_SECRET} = require('../keys');	// Importing the secret key
const mongoose = require('mongoose');	// Importing mongoose to verify the token
const User = mongoose.model("User");	// Importing the User model

// Desc: Middleware to check if user is logged in

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    // authorization === Bearer token
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"});
    }
    // Extracting the token from the header
    const token = authorization.replace("Bearer ","");
    
    // Verifying the token

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"});
        }
        const {_id} = payload; // Extracting the user id from the payload
        User.findById(_id).then(userdata=>{
            req.user = userdata; // Storing the user data in the request object
            next();
        });
    });
    
}