const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, default:''}, // 
    lastName: {type:String, trim:true, default:''},
    goatElo: {type: Number, default: 0},
	birthday: {
        year: {type: Number, default: 0},
        month: {type: Number, default: 0},
        day: {type: Number, default: 0}
    },
    team: {type:String, trim:true, default:''},
    position: {type: String, trim:true, default: ''},
	url: {type:String, trim:true, default:'https://mlp.pt/wp-content/themes/alchemists/assets/images/player-placeholder-380x490.jpg'}
})

module.exports = mongoose.model('Player', PlayerSchema)