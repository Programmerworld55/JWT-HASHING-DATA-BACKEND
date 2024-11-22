const express=require('express')
const jwt=require('jsonwebtoken')
const UserAuthModel=require('../models/user_signup_schema')
const dotenv=require("dotenv")



const router=express.Router();
// console.log(UserAuthSchema)
// ................
dotenv.config()


router.post('/signup',async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const UserExist=await UserAuthModel.findOne({email});
        if(UserExist)
        {
            return res.status(400).json({message:'User Already Exists'})
        }
        const NewUser=await UserAuthModel.create({name,email,password})
        res.status(201).json({message:'User Registered Successfully',NewUser})

    }
    catch (error) {
        res.status(400).json({ error: error.message });
        console.log("error while saving data in database : ", error);
      }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const UserData=await UserAuthModel.findOne({email});
        if(!UserData)
        {
            return res.status(401).json({message:"invalid email or password"})
        }

        const isMatch=await UserData.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({message:"invalid email or password"})
        }

        const token=jwt.sign({id:UserData._id},process.env.JWT_SECRET,{
            expiresIn:'1h'
        });

        res.json({message:'Login successful',token})
    }
    catch (error) {
        res.status(400).json({ error: error.message });
        console.log("error while checking login data in database : ", error);
      }



    
})


module.exports = router;
