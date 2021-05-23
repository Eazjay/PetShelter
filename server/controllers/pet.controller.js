const {Pet} = require('../models/pet.model');

module.exports.createPet = (request, response) => {
    const { name, type, desc, likes, skill1, skill2, skill3 } = request.body;
    Pet.create({
        name,
        type,
        desc,
        likes,
        skill1,
        skill2,
        skill3
    })
        .then(pet => response.json({Pet: pet}))
        .catch(err => response.json(err));
}
module.exports.findPets = (request, response) => {
    Pet.find({}).sort({type:1})
        .then(pets => response.json({ Pets: pets }))
        .catch(err => response.json({ message: "Something went wrong", error: err }));
};
module.exports.findOnePet = (request, response) =>{
    Pet.findOne({_id: request.params.id})
        .then(pet => response.json({Pet: pet}))
        .catch(err => response.json(err))
}
module.exports.updateOnePet = (request, response) => {
    Pet.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
        .then(updatedPet => response.json({ Pet: updatedPet }))
        .catch(err => response.json(err))
}
module.exports.deleteOnePet = (request, response) => {
    Pet.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}