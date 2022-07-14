const axios = require('axios');
const { Pokemon, Type } = require('../../db');
// https://pokeapi.co/api/v2/pokemon?limit=200&offset=0/
//https://pokeapi.co/api/v2/pokemon/
const URL_GET = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
    indexAndName: async (req, res) => {
        //if(RATTATA)
        if(req.query.name) {
                   //https://pokeapi.co/api/v2/pokemon/rattata
            axios.get(`${URL_GET}${req.query.name.toLowerCase()}`)
                     //la informacion que me llega de la api
                .then(data => data.data)
                     // la voy a responder segun el nombre que recibe la query
                .then(data => res.send({
                    id: data.id,
                    name: data.forms[0].name,
                    img: data.sprites.other.home.front_default,
                    //puede tener muchos tipos fire, grock, etc
                    types: data.types.map(elem => {return {name: elem.type.name}}),
                    life: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    speed: data.stats[5].base_stat,
                    weight: data.weight,
                    height: data.height
                })).catch(async (error) => { // en caso de que el nombre de la api no exista, respondo con un error que se fija en mi db
                    try {
                        // usando el metodo findOne voy comparando el nombre de la query con el de la db 
                        let onePokemonDB = await Pokemon.findOne({
                            where: {name: req.query.name},
                                include: {
                                    model: Type,
                                    attributes: ['name'],
                                    through: {
                                        attributes: [],
                                    }
                                }
                            });
                            //en caso de que exista muestro los datos
                        res.send(onePokemonDB)
                    } catch (error) {
                        res.send('el pokemon indicado no existe')
                    }
                })
        } else { //si no le pasan ningun nombre por query voy a hacer lo siguiente: 
            try {
                //traigo la informacion de la api
                const firstRequest = await axios.get(URL_GET);
                //en la primer promesa hay contenido entonces creo una segunda para traerme la data que me falta
                const secondRequest = await axios.get(firstRequest.data.next);
                //voy a traer toda la data de la primera promesa
                const infoFirstRequest = await axios.all(firstRequest.data.results.map(elem => axios.get(elem.url)));
                ////voy a traer toda la data de la segunda promesa
                const infoSecondRequest = await axios.all(secondRequest.data.results.map(elem => axios.get(elem.url)));
                //concadeno en una variable para iterarla y sacar los datos que necesito
                const fullRequestApi = [
                    ...infoFirstRequest,
                    ...infoSecondRequest
                ];
                //map que me trae toda la informacion
                let fullInfoApi = fullRequestApi.map(elem => ({
                    id: elem.data.id,
                    name: elem.data.forms[0].name,
                    img: elem.data.sprites.other.home.front_default,
                    attack: elem.data.stats[1].base_stat,
                    types: elem.data.types.map(elem => {return {name: elem.type.name}})
                }));
                // traigo la data db de mi tabla Pokemon y los tipos de pokemones
                let pokemonsDB = await Pokemon.findAll({
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        }
                    }
                });
                //muestro todo, tanto mi db como mi api xd
                res.send([...pokemonsDB, ...fullInfoApi]);

            } catch (error) {
                res.send(error.message);
            }
        }
    },
    detail: async (req, res) => {
        let id = req.params.id;
        if(id.length < 8) {
            //pido traer la data segun id
            await axios.get(`${URL_GET}${id}`)
                .then(data => data.data)
                .then(data => {
                    res.send({
                        id: data.id,
                        name: data.forms[0].name,
                        img: data.sprites.other.home.front_default,
                        types: data.types.map(elem => {return {name: elem.type.name}}),
                        life: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        speed: data.stats[5].base_stat,
                        weight: data.weight,
                        height: data.height
                    })
                }).catch(error => res.send(error.message))     
        } else {
            try {
                //en caso de no encontrarla en la api me fijo en la db
                let onePokemon = await Pokemon.findOne({
                    where: { id, },
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        }
                    }
                });
                res.send(onePokemon);
            } catch (error) {
                res.send(error.message)
            } 
        }
    },
    create: async (req, res) => {
        let { name, life, attack, defense, speed, weight, height, type, img, id } = req.body;
        try {
            //en el input me fijo si existe por el id
            let pokemonSearch = await Pokemon.findByPk(id);
            if(pokemonSearch) {
                //remuevo los tipos
                await pokemonSearch.removeTypes(await pokemonSearch.getTypes());
                //los actualizo 
                await Pokemon.update({
                    name: name.toLowerCase(),
                    life,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img
                },{
                    where: { id, }
                });

                let types = await Type.findAll({
                    where: {name: type}
                });
                //agrego que tipo de pokemon va a ser
                await pokemonSearch.addType(types);
                res.send('success');
            } else {
                //si no existe voy a crear un pokemon 
                let pokemonCreate = await Pokemon.create({
                    name: name.toLowerCase(),
                    life,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img
                });
                let types = await Type.findAll({
                    where: {name: type}
                });
                pokemonCreate.addType(types);
                res.send('success');
            }
        } catch (error) {
           console.log(error.message);
        }
    },
    delete: async (req, res) => {
        let namePoke = req.query.name;
        try {
            //verifico si existe 
            let pokemonSearch = await Pokemon.findOne({
                where: {
                    name: namePoke
                }
            });
            //remuevo los tipos
            pokemonSearch.removeTypes(await pokemonSearch.getTypes());
            // lo elimino
            await Pokemon.destroy({
                where: {
                    name: namePoke
                }
            });
            res.send('success');
        } catch (error) {
            console.log(error.message)
        }
    }
}