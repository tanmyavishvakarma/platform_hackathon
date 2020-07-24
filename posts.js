const router=require('express').Router();

router.get('/',async (req,res)=>{
    res.json({posts:{title:"title",description:"descp"}})
});

module.exports=router;