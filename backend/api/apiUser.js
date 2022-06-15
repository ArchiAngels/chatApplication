const express = require('express');
const router = express.Router();
const createNewUser = require('../scripts/createNewUser.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


router.post('/createNewUser',(req,res)=>{
  let result;
  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    result = await createNewUser(chunk);
    res.json({status:'ok',value:result});
  })
  
});


router.post('/loginUser',(req,res)=>{
  req.on('data',(chunk)=>{
    console.log(chunk+'');
  })
  res.json('ok');
});

module.exports = router;