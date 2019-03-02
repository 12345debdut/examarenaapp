const express=require('express');
const router=express.Router();
const authControl=require("../controllers/authcontroller");
const authService=require('../services/auth')
router.get('/wbjee',authService.checkJWT,authControl.retrieveData);
router.get('/jeemain',authService.checkJWT,authControl.retrieveDatajeemain);
router.get('/expire',authService.checkJWT,(req,res)=>{
    res.status(200).json({message:"token valid"})
})
module.exports=router;