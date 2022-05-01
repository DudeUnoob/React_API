const mongoose = require('mongoose')
const { mongooseConnectionString } = require('../config/appconfig.json')

mongoose.connect(mongooseConnectionString).then(() => console.log(`Connected to db`))

let Schema = new mongoose.Schema({
    username: String
})

module.exports = mongoose.model('User', Schema)