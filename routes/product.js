const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product=require('./../models/Product')

// CREATE

router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct=new Product(req.body);

    try{
        const savedProduct=await newProduct.save();

        res.status(200).json(savedProduct)

    }catch(err){
        res.status(500).json(err);
    }
})


// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },
        {new:true}
        );
        res.status(200).json(updatedProduct);

    }catch(err){
        res.status(500).json(err);
    }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been Deleted..." });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET PRODUCT
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qBrand=req.query.brand;
  try {
      let products;
        if(qNew){
            console.log("1")

            products=await Product.find().sort({createdAt:-1}).limit(5);
        }else if(qBrand){
          products=await Product.find({
              categories:{
                  $in:[qBrand],
              }
          });
      }else if(qCategory){
            products=await Product.find({
                categories:{
                    $in:[qCategory],
                }
            });
        }else{
            products=await Product.find();

        }

        res.status(200).json(products)
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
