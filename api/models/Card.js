const mongoose = require('mongoose')


const CardSchema = new mongoose.Schema({
    name:String,
    color:String,
    hp:Number,
    atk:Number,
    image:String//a url

    //IN THE FUTURE:
    //make things like OnPlay,OnDeath, etc (adding complex functions to cards)
})
const Card = mongoose.model('Card', CardSchema)

module.exports= Card