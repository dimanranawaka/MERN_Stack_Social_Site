const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");
const bcrypt = require('bcryptjs');


// Signup route

router.post('/signup',(req,res)=>{ 

    const {name,email,password} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({error:"Please add all the fields"});
    }
    
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that email"});
        }

        // hashing the password
        bcrypt.hash(password,12)
        .then(hashedpassword=>{

            const user = new User({
                email,
                password:hashedpassword,
                name
            });

            user.save()
            .then(user=>{
                res.json({message:"Saved successfully"});
            })
            .catch(err=>{
                console.log(err);
            });

        });

        
    })
    .catch(err=>{
        console.log(err);
    });
});

// Signin route

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
       return res.status(422).json({error:"Please add email or password"});
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.json({message:"Successfully signed in"});
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"});
            }
        })
        .catch(err=>{
            console.log(err);
        });
    });
});

module.exports = router;