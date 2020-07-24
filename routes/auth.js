const router =require('express').Router();
const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
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
    if(!validpass) return res.status(400).send("Invalid Email or Password");
    
    const token=jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);


   // res.send("Logged In");
});
router.delete('/delete/:id',(req,res)=>{
User.remove({
    _id: req.params.id,
    
  }, function (err, user) {
    if (err)
      return console.error(err);

    res.send('User successfully removed from database');
    res.status(200).send();
  });
  });
  router.get('/allusers',async (req,res)=>{
      User.find({},function(err,user){
          if(err){
              res.send('denied');
              next();
          }
          res.json(user)
      });
  });


module.exports=router;