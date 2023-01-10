const mongoose =require('mongoose');
const platSchema = mongoose.Schema({
    className:String,
    price:String,
    category:String,
    date:String,
    level:String,
    idTrainer:String,
    
});
const plat = mongoose.model('plat',platSchema);
module.exports= plat;