const mongoose = require("mongoose")
const MoviceSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    des:{type:Strin},
    img:{type:String},
    imgTitle:{type:String},
    trailer:{type:String},
    vdeo:{type:String},
    year:{type:String},
    limit:{type:Number},
    genre:{type:String},
    isSeries:{type:Boolen , default:false}
    
 

},{
    timestamps:true
})
module.exports = mongoose.model("Movice", MoviceSchema)