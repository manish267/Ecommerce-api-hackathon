const router=require('express').Router();
const {verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Review =require('./../models/Review');
const Product=require('./../models/Product')

// create a review for a product

router.post('/:id/:productId',verifyTokenAndAuthorization,async(req,res)=>{

    try{
      const product = await Product.findById(req.params.productId);

      const review=new Review({
        rating:req.body.rating,
        comment:req.body.comment
      });
      product.reviews.push(review);

      await review.save();
      await product.save();

      res.status(200).json(product);
    }catch(err){
        res.send("Error while creating Review")
    }
})

module.exports=router;