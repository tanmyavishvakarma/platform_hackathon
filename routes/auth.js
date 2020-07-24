const router =require('express').Router();
const User=require('../model/User');
const bcrypt=require('bcryptjs');
router.post('/register',async(req,res)=>{

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword, 
        budget:req.body.budget,
        products:req.body.products
    });
    try{
        const savedUser=await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});
router.post('/login',async (req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid Email or Password");
    const validpass=await bcrypt.compare(req.body.password,user.password);
    if(!validpass) return res.status(400).send("Invalid Email or Password")

    res.send("Logged In");
});
module.exports=router;