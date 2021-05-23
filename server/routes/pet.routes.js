const PetController = require('../controllers/pet.controller');

module.exports = function(app){
    app.post('/api/pets/new', PetController.createPet);
    app.get('/api/pets', PetController.findPets);
    app.get('/api/pets/:id', PetController.findOnePet);
    app.put('/api/pets/:id/update', PetController.updateOnePet);
    app.delete('/api/pets/:id/delete', PetController.deleteOnePet);
}