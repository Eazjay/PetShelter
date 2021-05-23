const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet's Name is required."],
        minLength: [3, "Pet's Name must be at least 3 characters long "]
    },
    type: {
        type: String,
        required: [true, "What type is the pet?"],
        minLength: [3, "Pet type must be at least 3 characters long "]
    },
    desc: {
        type: String,
        required: [true, "Description is required."],
        minLength: [3, "Description must be at least 3 characters long"]
    },
    likes: {
        type: Number,
        default: 0
    },
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    },
}, {timestamps:true});

module.exports.Pet = mongoose.model("Pet", PetSchema);