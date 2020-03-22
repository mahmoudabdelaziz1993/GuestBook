const router =  require('express').Router();

router.get('/', (req,res)=>{
    res.send(' Server is Running ')
})
 module.exports = router 