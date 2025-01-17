import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            message: "Please enter a valid email address",
            validator: (email) => validator.isEmail(email)
         }
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        validate: [
            {
                message: "Password must be at least 8 characters in length",
                validator: (password) => password.length >= 8
            },
            {
                message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                validator: (password) => validator.isStrongPassword(password,
                    { minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
            }
        ]
    },
    user_type: {
        type: String,
        enum: ['charity', 'adopter'],
        required: true
    },
    charity_name: {
        type: String,
        required: function () {
            return this.user_type === "charity"
        }
    },
    charity_number: {
        type: Number,
        required: function () {
            return this.user_type === "charity"
        }
    },
    location: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: function () {
            return this.user_type === "charity"
        }
    },
    is_charity: true

})

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
})
userSchema.methods.isPasswordValid = function (plaintextPassword) {
    return bcrypt.compareSync(plaintextPassword, this.password)
}

export default mongoose.model("User", userSchema)