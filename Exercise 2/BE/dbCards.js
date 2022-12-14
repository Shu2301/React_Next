const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    name: String,
    timestamp: String,
    received: Boolean,
    message: String
})

module.exports = mongoose.model('cards', cardSchema)