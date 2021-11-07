const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:true
    },
    categories:{
        type:Array
    },
    size:{
        type:String

    },
    color:{
        type:String

    },
    price:{
        type:Number,
        required:true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
},{timestamps:true})


module.exports=mongoose.model('Product',productSchema);

