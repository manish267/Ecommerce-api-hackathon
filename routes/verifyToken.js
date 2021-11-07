const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
           jwt.verify(authHeader,process.env.JWT_SECRET,(err,user)=>{
               if(err){
                return res.status(400).json({message:"Token is not valid"})
               }
               if(user){
                   req.user=user;
                   next();
               }
           });
           
    }else{
        return res.status(400).json({message:"You are not Authenticated"})
    }

}
const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userId===req.params.id || req.user.isAdmin){
        next();
        }else{
            res.status(403).json({message:"You are not allowed to do that"});
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
        next();
        }else{
            res.status(403).json({message:"You are not allowed to do that"});
        }
    })
}

module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}