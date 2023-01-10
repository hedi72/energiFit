const mongoose =require('mongoose');
const classeSchema = mongoose.Schema({
    className:String,
    price:String,
    category:String,
    date:String,
    level:String,
    idTrainer:String,
    
});
const classe = mongoose.model('classe',classeSchema);
module.exports= classe;