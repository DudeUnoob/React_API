const mongoose = require('mongoose')
const { mongooseConnectionString } = require('./config/appconfig.json')


mongoose.connect(mongooseConnectionString).then(() => console.log(`Connected to db`))

let Schema = new mongoose.Schema({
    username: String,
    password: String,
    profilepicture: String,
    uid: String,
    cards: {
        flashcard: Array,
        answer: Array
    },
    blog:{
        title: String,
        description: String,
        time: String
    }, 
    Document: Object
    
    
    
})

module.exports = mongoose.model('User', Schema)
