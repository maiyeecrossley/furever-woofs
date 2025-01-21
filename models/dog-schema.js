import mongoose from "mongoose"

const doggoSchema = new mongoose.Schema({
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
    live_with_cats: {
        type: Boolean, 
        required: true
    },
    live_with_dogs: {
        type: Boolean,
        required: true
    },
    live_with_children: {
        type: Boolean,
        required: true
    },
    charity_name: {
        type: String,
        required: true
    }, 
    charity_number: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    }

})

export default mongoose.model("Doggie", doggoSchema)