const router=require('express').Router();

router.get('/',(req,res)=>{
    res.json({posts:{title:"title",description:"descp"}})
});

module.exports=router;