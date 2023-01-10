const mongoose =require('mongoose');
const reservationSchema = mongoose.Schema({
    idClass:String,
    idPlayer:String,
    namePlayer:String,
  
    
});
const reservation = mongoose.model('reservation',reservationSchema);
module.exports= reservation;