const axios  = require("axios")
const { Type } = require('../../db')
const URL_TYPE = "https://pokeapi.co/api/v2/type";

module.exports = {
    index: async (req, res) => {
        try {
            let typesApi = await axios.get(URL_TYPE);
            let nameTypes = typesApi.data.results.map(elem => elem.name);
            nameTypes.forEach(elem => {
                Type.findOrCreate({
                    where: {
                        name: elem
                    }
                })
            }); 
             res.send(typesApi)
        } catch (error) {
            res.send(error.message)
        }
    },
    getTypes: async (req, res) => {
        try {
            let types = await axios.get(URL_TYPE);
            res.send(types.data.results.map(elem => elem.name));        
        } catch (error) {
            return res.send(error)
        }
    }
} 