import mongoose from "mongoose"
import { generateReference } from "../middleware/reference-generator.js"

const doggoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: [{
        type: String,
        required: true,
        validate: {
            message: "You have selected more than 3 breeds. Please use 'Other cross-breed' option.",
            validator: (breeds) => breeds.length <= 3
        }
    }],
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
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
        unique: true
    }

})

doggoSchema.pre("save", generateReference)

export default mongoose.model("Doggie", doggoSchema)