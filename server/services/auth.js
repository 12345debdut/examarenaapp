const admin=require('../admin/admin');
//MIDDLEWARE

exports.checkJWT=(req,res,next)=>{
    const token=req.headers['authorization'];
    admin.appauth.verifyIdToken(token).then((decodedidtoken)=>{
        if(decodedidtoken)
        {
            req.user=decodedidtoken;
            next();
        }
    }).catch((err)=>{
        res.status(500).json({message:"token expires"})
    })
}