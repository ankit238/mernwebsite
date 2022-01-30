const express=require("express");
const dotenv=require("dotenv");

const cors=require("cors");
const User=require("./db/User");
//const Product=require("./db/Product")
const app=express();
app.use(cors());
app.use(express.json());

dotenv.config({path:'./configg.env'});
require("./db/config");


app.post("/register",async(req,res)=>{
   const{name,email,password}=req.body
   if(!name||!email||!password){
      return res.status(422).json({error:"plz filled the filed properly"})

   }

   try{
const userExist=await User.findOne({email:email});
if(userExist){
   return res.status(422).json({error:"email already exist"});

}
const user=new User({name,email,password});
await user.save()
res.status(201).json({message:"user registered successfuly"})


   }catch(err){
      console.log(err);
   }
//  let user=new User(req.body);
//  let result=await user.save();
 
//  result=result.toObject();
//  delete result.password
//  res.send(result)
   
});

app.post("/login",async (req,res)=>{
    if(req.body.password && req.body.email){
       let user=await User.findOne(req.body).select("-password");
    if(user)
    {
       res.send(user)
    }else{
       res.send({result:"No User Found"})
    }
 }else{
       res.send({result:"plz fill both filed"})
    }
    
    
 })

app.listen(5000)