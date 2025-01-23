import mongoose from "mongoose"
import doggos from "../data.js"
import Doggie from "../models/dog-schema.js"
import User from "../models/user-schema.js"
import dotenv from "dotenv"

async function seed() {
dotenv.config()

    console.log("connecting to database 🤖")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connection established 🤖")

    console.log('Clearing database... 🧹')
    await mongoose.connection.db.dropDatabase()

    const user = await User.create({
        first_name: "developer",
        last_name: "developer",
        email: "dev@dev.com",
        password: "Qwerty12345!",
        dob: "01/01/1991",
        location: "manchester",
        telephone: "0161",
        user_type: "charity",
        charity_name: "doggie",
        charity_number: "12345"
    })
    
    doggos.forEach((dog) => {
        dog.user = user
    })


    console.log("Seeding the database with doggies 🐶")
    const allDoggies = await Doggie.create(doggos)
    console.log(allDoggies)

    console.log("Disconnecting 👋")
    await mongoose.disconnect()
}

seed()