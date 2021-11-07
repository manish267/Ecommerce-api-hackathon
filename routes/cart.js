const express = require("express");
const router = express.Router();
const {verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Cart=require('./../models/Cart')

// CREATE

router.post("/",verifyToken,async (req,res)=>{
    const newCart=new Cart(req.body);

    try{
        const savedCart=await newCart.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})


// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },
        {new:true}
        )
        res.status(200).json(updatedCart);
    }catch(e){
        res.status(500).json(err);
    }
        

});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart has been Deleted..." });
  } catch (error){
    res.status(500).json({ error });
  }
});

// GET USER CART
router.get("/cart/:id",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.id});
    res.status(200).json(cart);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error });
  }
});

// GET ALL CART
router.get("/",verifyTokenAndAdmin, async (req, res) => {
 
  try {
    
    const carts=await Cart.find();
    res.status(200).json(carts)
       
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
