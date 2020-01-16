const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            // async fala pra esperar o await retornar p continuar o código
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiResponse.data
            const techArray = parseStringAsArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location
            })
        }
    
        return response.json(dev)
    },

    async update(request, response) {
        const { id } = request.params
        const { name, avatar_url, bio, techs, longitude, latitude } = request.body
        
        const newTechs = parseStringAsArray(techs)
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const newDevData = await Dev.updateOne(
            {_id: id },
            {
                $set: {
                    name,
                    avatar_url,
                    bio,
                    techs: newTechs,
                    location
                }
            }
        )

        return response.json(newDevData)
    },

    async destroy(request, response) {
        const { _id } = request.params
        
        await Dev.deleteOne({ $eq: _id })
        
        return response.json({ mesage: "deletado na moral" })
    }
}