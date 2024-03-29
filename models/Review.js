const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    rating:{
        type:String,
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        default:"User"
    }
},{timestamps:true});

module.exports=mongoose.model('Review',reviewSchema);
