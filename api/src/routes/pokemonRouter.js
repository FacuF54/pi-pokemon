const { Router } = require('express');

const pokemonController = require('./controller/pokemonController');

const router = Router();


router.get('/', pokemonController.indexAndName); 
router.post('/', pokemonController.create); 
router.get('/:id', pokemonController.detail);
router.delete('/delete/', pokemonController.delete);

module.exports = router;