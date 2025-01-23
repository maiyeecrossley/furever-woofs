import mongoose from "mongoose"
import { generateReference } from "../middleware/reference-generator.js"

const doggoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    
    breed: {
        type: [String],
        required: true,
        validate: {
            message: "You have selected more than 3 breeds. Please use 'Other cross-breed' option.",
            validator: (breeds) => breeds.length <= 3
        },
        set: (breeds) => {
            const formatBreed = (breed) => 
                breed.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    
            return Array.isArray(breeds) ? breeds.map(formatBreed) : [formatBreed(breeds)]
        }
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    location: {
        type: String,
        required: true,
        set: (input) =>
            input.split(/[\s,]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')
    },
    description: {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
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
        required: true,
        set: (input) =>
            input.split(/[\s,]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')
    }, 
    charity_number: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    }

})

doggoSchema.pre("save", generateReference)

export default mongoose.model("Doggie", doggoSchema)