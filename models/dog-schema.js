import mongoose from "mongoose"

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: [{
        type: String,
        required: true
    }],
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    suitable_with_cats: {
        type: Boolean, 
        required: true
    },
    suitable_with_dogs: {
        type: Boolean,
        required: true
    },
    suitable_with_children: {
        type: Boolean,
        required: true
    },
    charity_name: {
        type: String,
        required: true
    }, 
    reference: {
        type: String,
        required: true
    }

})

export default mongoose.model("Doggie", dogSchema)