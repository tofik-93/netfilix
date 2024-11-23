const router = require("express").Router()
const { verify } = require("jsonwebtoken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require()
//UPDATE
router.put("/:id", verify, async (req, res)=>{
  if(req.user.id === req.params.id || req.user.isAdmin)  {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString()
    }
    try{
  const updatedUser = await User.findByIdAndUpdate(res.params.id, {$set:req,body})
    }
    catch(err){
      res.status(500).json(err)    }
  }
else{
  res.status(403).json("You can update only your account!")
}}
)
//DELETE
//GET
//GET ALL
// GET USER STATS