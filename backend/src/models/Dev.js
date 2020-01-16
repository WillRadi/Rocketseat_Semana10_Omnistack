const mongoose = require('mongoose')
const PointSchema = require('../models/utils/PointSchema')

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

// index: '2dsphere' ===> tipo de index padrão para geolocalição. É necessário.

// parâmetros: Nome do modelo, esquema
module.exports = mongoose.model('Dev', DevSchema)