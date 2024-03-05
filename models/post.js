const mongoose = require('mongoose'); // Import mongoose
const {ObjectId} = mongoose.Schema.Types; // Import ObjectId from mongoose

// Create a schema

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"	
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

// Create a model

mongoose.model("Post",postSchema); // Create a model with the name "Post" and the schema "postSchema"