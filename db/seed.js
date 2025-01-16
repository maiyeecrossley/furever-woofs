import mongoose from "mongoose"
import doggos from "../data.js"
import Doggie from "../models/dog-schema.js"

async function seed() {

    console.log("connecting to database 🤖")
    await mongoose.connect("mongodb://127.0.0.1:27017/doggo-db")
    console.log("connection established 🤖")

    console.log("Seeding the database with doggies 🐶")
    const allDoggies = await Doggie.create(doggos)
    console.log(allDoggies)

    console.log("Disconnecting 👋")
    await mongoose.disconnect()
}

seed()